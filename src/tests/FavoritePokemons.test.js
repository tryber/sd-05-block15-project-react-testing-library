import React from 'react';
import renderRoute from '../services/render';
import { FavoritePokemons } from '../components';

test('verify if has no pokemons', () => {
  const { container } = renderRoute(<FavoritePokemons />);
  const h2 = container.querySelectorAll('p');
  expect(...h2).toHaveTextContent('No favorite pokemon found');
});
