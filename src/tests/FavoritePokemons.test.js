import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import { FavoritePokemons } from '../components';

test('testar se não há pokemons favoritados', () => {
  const { container } = renderWithRouter(<FavoritePokemons />);
  const p = container.querySelectorAll('p');
  expect(...p).toHaveTextContent('No favorite pokemon found');
});
