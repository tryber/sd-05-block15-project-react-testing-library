import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

test('returns a card with information about selected pokemon', () => {
  const pid = 4;
  const { getByTestId, getByText, getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByTestId('next-pokemon'));

  const selectedPokemon = pokemons.find((pokemon) => pokemon.id === 4);
  const { averageWeight, image, name, type } = selectedPokemon;

  expect(getByTestId('pokemon-name')).toBeInTheDocument();
  expect(getByTestId('pokemon-name').innerHTML).toEqual(name);
  expect(getByTestId('pokemonType')).toBeInTheDocument();
  expect(getByTestId('pokemon-name').innerHTML).toEqual(type);
  expect(getByTestId('pokemon-weight').innerHTML).toBe(`Average weight:${averageWeight.value}${averageWeight.measurementUnit}`);
  expect(getAllByRole('img')[0]).toHaveProperty('src', image);
  expect(getAllByRole('img')[0]).toHaveProperty('alt', `${name} sprite`);

  expect(getByText('More details')).toHaveProperty('href', `http://localhost/pokemons/${pid}`);
});

test('if favorited, shows a star icon', () => {
  const { getByLabelText, getByText, getAllByRole, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const name = getByTestId('pokemon-name').innerHTML;
  fireEvent.click(getByText('More details'));
  const favCheckbox = getByLabelText('Pokémon favoritado?');
  if (favCheckbox.checked === false) {
    fireEvent.click(favCheckbox);
  }
  fireEvent.click(getByText('Home'));
  expect(getAllByRole('img')[1]).toHaveProperty('src', 'http://localhost/star-icon.svg');
  expect(getAllByRole('img')[1]).toHaveProperty('alt', `${name} is marked as favorite`);
});
