import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

test('testing component Favorite Pokemons', () => {
  const { getByText } = render(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});
