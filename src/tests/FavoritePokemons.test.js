import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../components/renderWithRouter';

test('A mensagem No favorite pokemon found deve aparecer na tela', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const favorit = getByText(/No favorite pokemon found/i);
  expect(favorit).toBeInTheDocument();
});
