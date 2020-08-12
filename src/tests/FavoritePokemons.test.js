import React from 'react';
import { render } from '@testing-library/react';
import Favorite from '../components/FavoritePokemons';

test('About deve exibir informações sobre a Pokédex', () => {
  const { getByText } = render(
    <Favorite />,
  );
  const batatinha = getByText(/No favorite pokemon found/i);
  expect(batatinha).toBeInTheDocument();
});
