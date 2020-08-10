import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';


test('Testing Pokedex next buttom `Próximo pokémon`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const nextButton = getByText('Próximo pokémon');
  expect(nextButton).toBeInTheDocument();
  const first = pokemons[0].name;
  pokemons.forEach((pokemon) => {
    const actualPoke = getByText(pokemon.name);
    expect(actualPoke.innerHTML).not.toBe('');
    fireEvent.click(nextButton);
  });
  const actualPoke = getByText(pokemons[0].name);
  expect(actualPoke.innerHTML).toBe(first);
});

test('Checking type buttons', () => {
  const { getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const allButtons = getAllByRole('button');
  expect(allButtons.length).toBe(9);
  expect(allButtons.some((btn) => btn.innerHTML === 'All')).toBe(true);
  expect(allButtons.some((btn) => btn.innerHTML === 'Electric')).toBe(true);
  expect(allButtons.some((btn) => btn.innerHTML === 'Fire')).toBe(true);
  expect(allButtons.some((btn) => btn.innerHTML === 'Bug')).toBe(true);
  expect(allButtons.some((btn) => btn.innerHTML === 'Poison')).toBe(true);
  expect(allButtons.some((btn) => btn.innerHTML === 'Psychic')).toBe(true);
  expect(allButtons.some((btn) => btn.innerHTML === 'Normal')).toBe(true);
  expect(allButtons.some((btn) => btn.innerHTML === 'Dragon')).toBe(true);
  expect(allButtons.some((btn) => btn.innerHTML === 'Próximo pokémon')).toBe(true);
});
test('Render basic title', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const title = getByText(/Encountered pokémons/i);
  expect(title).toBeInTheDocument();
});
test('Render with data test ID', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const dataID = getAllByTestId(/pokemon-type-button/i);
  dataID.forEach((e) => expect(e).toBeInTheDocument());
  expect(dataID.length).toBe(7);
});
test('Filter all should work', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const nextButton = getByText('Próximo pokémon');
  expect(nextButton).toBeInTheDocument();
  const first = pokemons[0].name;
  let counter = 0;
  pokemons.forEach((pokemon) => {
    const actualPoke = getByText(pokemon.name);
    expect(actualPoke.innerHTML).not.toBe('');
    counter += 1;
    fireEvent.click(nextButton);
  });
  const actualPoke = getByText(pokemons[0].name);
  expect(actualPoke.innerHTML).toBe(first);
  expect(counter).toBe(9);
});
