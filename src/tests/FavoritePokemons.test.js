import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

test('Caso a pessoa não tenha pokémons favoritos, a mensagem `No favorite pokemon found` deve aparecer na tela.', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />);
  expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
});

test('A página não deve exibir nenhum card de pokémon não favoritado. / A página deve exibir todos os cards de pokémons favoritados', () => {
  const { getAllByText } = renderWithRouter(<FavoritePokemons pokemons={[pokemons[0]]} />);
  expect(getAllByText('Pikachu').length).toEqual(1);
  expect(getAllByText(/Average weight:/i).length).toEqual(1);
});
