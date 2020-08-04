import React from 'react';
import FavoritePokemon from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const pokemonsFavoritados = {
  25: false,
  4: false,
  10: false,
  23: false,
  65: false,
  151: true,
  78: false,
  143: false,
  148: false,
};

const arrayFavorite = pokemons.filter(({ id }) => pokemonsFavoritados[id]);
const arrayNotFavorite = pokemons.filter(({ id }) => !pokemonsFavoritados[id]);

describe('testes no FavoritePokemons', () => {
  test('testando sem nenhum pokemon favoritado', () => {
    const { getByText } = renderWithRouter(<FavoritePokemon pokemons={[]} />);
    const noFavText = getByText(/No favorite pokemon found/i);
    expect(noFavText).toBeInTheDocument();
  });

  test('testando colocando o cards 65 como favoritado', () => {
    const feedFavoritePokemon = pokemons.filter((pokemon) => pokemon.id === 65);
    const { getByText } = renderWithRouter(<FavoritePokemon pokemons={feedFavoritePokemon} />);
    const pokemon65 = getByText(/Alakazam/i);
    expect(pokemon65).toBeInTheDocument();
  });

  it('testando se nenhum card nao favoritado eh renderizado', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemon pokemons={arrayNotFavorite} />);
    arrayFavorite.forEach((item) => {
      const pokemonId = queryByText(item.name);
      expect(pokemonId).not.toBeInTheDocument();
    });
  });

  it('testando se todos os cards favoritados são renderizados', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemon pokemons={arrayFavorite} />);
    arrayFavorite.forEach((item) => {
      const pokemonId = queryByText(item.name);
      expect(pokemonId).toBeInTheDocument();
    });
    arrayNotFavorite.forEach((item) => {
      const pokemonId = queryByText(item.name);
      expect(pokemonId).not.toBeInTheDocument();
    });
  });
});
