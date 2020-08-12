import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, getByLabelText, getByRole } from '@testing-library/react';
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
  const { averageWeight, image, name } = selectedPokemon;

  expect(getByTestId('pokemon-name')).toBeInTheDocument();
  expect(getByTestId('pokemon-weight').innerHTML).toBe(`Average weight:${averageWeight.value}${averageWeight.measurementUnit}`);
  expect(getAllByRole('img')[0]).toHaveProperty('src', image);
  expect(getAllByRole('img')[0]).toHaveProperty('alt', `${name} sprite`);

  expect(getByText('More details')).toHaveProperty('href', `http://localhost/pokemons/${pid}`);
});

test('if favorited, shows a star icon', () => {
  const { getByLabelText, getByText, getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText('More details'));
  const favCheckbox = getByLabelText('Pokémon favoritado?');
  favCheckbox.checked === false ? fireEvent.click(favCheckbox) : null;
  fireEvent.click(getByText('Home'));
  expect(getAllByRole('img')[1]).toHaveProperty('src', 'http://localhost/star-icon.svg');
})
