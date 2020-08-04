import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import { FavoritePokemons } from '../components';

test('verify if has no pokemons', () => {
  const { container } = renderWithRouter(<FavoritePokemons />);
  const h2 = container.querySelectorAll('p');
  expect(...h2).toHaveTextContent('No favorite pokemon found');
});
