import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import { FavoritePokemons } from '../components';

test('shows "no pokemons found" message when needed', () => {
  const { getByText } = render(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );

  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});

test('shows all favorited pokemons', () => {
  const { getByText, getByLabelText, getAllByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText('More details'));
  expect(getByLabelText('Pokémon favoritado?').checked).toEqual(false);
  fireEvent.click(getByLabelText('Pokémon favoritado?'));
  fireEvent.click(getByText('Home'));

  fireEvent.click(getByText('Próximo pokémon'));
  fireEvent.click(getByText('More details'));
  expect(getByLabelText('Pokémon favoritado?').checked).toEqual(false);
  fireEvent.click(getByLabelText('Pokémon favoritado?'));

  fireEvent.click(getByText('Favorite Pokémons'));
  expect(getAllByText('More details').length).toBe(2);
});

test('doesnt show any non-favorited pokemons', () => {
  const { getByText, getByLabelText, queryByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText('Bug'));
  fireEvent.click(getByText('More details'));
  expect(getByLabelText('Pokémon favoritado?').checked).toEqual(false);
  fireEvent.click(getByText('Favorite Pokémons'));

  expect(queryByText('Bug')).not.toBeInTheDocument();
});
