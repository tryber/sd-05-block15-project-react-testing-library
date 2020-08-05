import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Pokedex } from '../components';
import pokemons from '../data';

const typeList = [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];

const falsePkm = {
  id: 666,
  name: 'Capeta',
  type: 'Infernal',
  averageWeight: {
    value: '666',
    measurementUnit: 'kg',
  },
  image: '',
  moreInfo: '',
  foundAt: [
    {
      location: '',
      map: '',
    },
  ],
  summary: 'Capeta é um demônio',
};

const resetHistory = (pkm = pokemons) => {
  const {
    getByText,
    container,
    getByRole,
    getAllByText,
  } = render(
    <MemoryRouter>
      <Pokedex pokemons={pkm} isPokemonFavoriteById={false} />
    </MemoryRouter>,
  );
  return { getByText, container, getByRole, getAllByText };
};

describe('Routes', () => {
  afterEach(cleanup);

  test('Checkout next button exists', () => {
    const { container } = resetHistory();
    const button = container.querySelector('.pokedex-button');
    expect(button).toBeInTheDocument();
    expect(button.innerHTML).toBe('Próximo pokémon');
  });

  test('Checkout next button functions', () => {
    const { getByText, container } = resetHistory();
    const button = getByText(/Próximo pokémon/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    // Testing click
    let card = getByText(/Average weight:8.5kg/i);
    expect(card).toBeInTheDocument();
    // Testing reset after last pokemon
    pokemons.forEach(() => {
      fireEvent.click(button);
    });
    card = getByText(/Charmander/i);
    expect(card).toBeInTheDocument();
    // Testing one per page
    card = container.querySelectorAll('.pokemon');
    expect(card.length).toBe(1);
  });

  test('checkout filters', () => {
    const { getByText, getAllByText, container } = resetHistory();
    const type = typeList[Math.floor(Math.random() * typeList.length)];
    const buttonAmount = container.querySelectorAll('.filter-button');
    const expected = type.length + 1;
    expect(buttonAmount.length).toBe(expected);

    buttonAmount.forEach((button) => {
      if (button.innerHTML === type) fireEvent.click(button);
    });

    const termsCount = getAllByText(type);
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(termsCount.length).toBe(2);

    const button = getByText('All');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    fireEvent.click(getByText(/Próximo pokémon/i));
    const charmander = getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
  });

  test('Dinamic Filters', () => {
    pokemons.push(falsePkm);
    const { getByText, container } = resetHistory(pokemons);
    let button = getByText(falsePkm.type);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    button = container.querySelector('.pokedex-button');
    expect(button.disabled).toBe(true);

    button = getByText('All');
    expect(button).toBeInTheDocument();
  });
});
