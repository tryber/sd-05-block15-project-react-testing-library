import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
test('Render `FavoritePokemons` to check no favorite', () => {
  const {getByText} = render(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>
  );
  expect(getByText(/No favorite pokemon found/))
    .toBeInTheDocument();
});