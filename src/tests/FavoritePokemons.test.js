import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import Data from '../data';

test('mensagem na tela', () => {
  const { getByText } = render(
    <MemoryRouter>
      <FavoritePokemons pokemons={[]} />
    </MemoryRouter>,
  );
  const mensagem = getByText('No favorite pokemon found');
  expect(mensagem).toBeInTheDocument();
});

test('Não exibir pokémons não favoritados', () => {
  const { queryByText } = render(
    <MemoryRouter>
      <FavoritePokemons pokemons={[Data[0]]} />
    </MemoryRouter>,
  );
  const pokemonNovo = queryByText('Charmander');
  expect(pokemonNovo).not.toBeInTheDocument();
  const pokemonFavorito = queryByText('Pikachu');
  expect(pokemonFavorito).toBeInTheDocument();
});
