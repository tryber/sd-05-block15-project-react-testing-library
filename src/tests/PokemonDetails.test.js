import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { PokemonDetails } from '../components';
import pokemons from '../data';

import App from '../App';

const resetHistory = (id = 0) => {
  const {
    getByText,
    queryByText,
    container,
    queryByAltText,
    queryAllByAltText,
    getByLabelText,
  } = render(
    <MemoryRouter>
      <PokemonDetails
        pokemons={pokemons}
        isPokemonFavoriteById={{ [id]: false }}
        match={{ params: { id: id.toString() } }}
        onUpdateFavoritePokemons={() => {}}
      />
    </MemoryRouter>,
  );
  return { getByText, container, queryByAltText, queryAllByAltText, queryByText, getByLabelText };
};

const resetApp = () => {
  const { container, getByText, getByLabelText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  return { container, getByText, getByLabelText };
};

const getRandomPkmIndex = () => Math.floor(Math.random() * pokemons.length);

describe('Testing pokémon detail', () => {
  afterEach(cleanup);
  let pkmIndex = getRandomPkmIndex();

  test('Details exists', () => {
    const { id, name, summary } = pokemons[pkmIndex];
    const { getByText, queryByText } = resetHistory(id);
    const myPkm = getByText(summary);
    const nameDetails = getByText(name);
    const link = queryByText(/More details/i);

    expect(myPkm).toBeInTheDocument();
    expect(nameDetails).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
  });

  test('Check Summary', () => {
    pkmIndex = getRandomPkmIndex();
    const { id } = pokemons[pkmIndex];
    const { container } = resetHistory(id);
    const h2 = container.querySelectorAll('h2')[1];

    expect(h2).toBeInTheDocument();
    expect(h2.innerHTML.includes('Summary')).toBe(true);
  });

  test('Check Maps', () => {
    pkmIndex = getRandomPkmIndex();
    const { id, name, foundAt } = pokemons[pkmIndex];
    const { container, getByText, queryAllByAltText, getByLabelText } = resetHistory(id);
    const h2 = container.querySelectorAll('h2')[2];

    expect(h2).toBeInTheDocument();
    expect(h2.innerHTML).toBe(`Game Locations of ${name}`);

    foundAt.forEach(({ location, map }, index) => {
      const loc = getByText(location);
      const img = queryAllByAltText(`${name} location`);
      expect(loc).toBeInTheDocument();
      expect(img[index]).toBeInTheDocument();
      expect(img[index].getAttribute('src')).toBe(map);
    });
  });

  test('Check favorites', () => {
    const { container, getByText, getByLabelText } = resetApp();
    const button = getByText(/More Details/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    const favButton = getByLabelText('Pokémon favoritado?');
    expect(favButton).toBeInTheDocument();
    fireEvent.click(favButton);

    const favImg = container.querySelector('.favorite-icon');
    expect(favImg).toBeInTheDocument();
    expect(favImg.getAttribute('alt')).toBe('Pikachu is marked as favorite');
    fireEvent.click(favButton);

    expect(favImg).not.toBeInTheDocument();
  });
});
