import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../types/renderWithRouter';
import pokemons from '../data';

test('Caso a pessoa não tenha pokémons favoritos, a mensagem `No favorite pokemon found` deve aparecer na tela.', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />);
  const favoriteText = getByText(/No favorite pokemon found/i);
  expect(favoriteText).toBeInTheDocument();
});

test('A página não deve exibir nenhum card de pokémon não favoritado.', () => {
  const { getAllByText } = renderWithRouter(<FavoritePokemons pokemons={[pokemons[0]]} />);
  expect(getAllByText('Pikachu').length).toEqual(1);
  expect(getAllByText(/Average weight:/i).length).toEqual(1);
});
