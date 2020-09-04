import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import { createMemoryHistory } from 'history';

import App from '../App';
import Data from '../data';

test('verificando CARD', () => {
  const novoPokemon = Data[0];
  const history = createMemoryHistory();

  const { getByText, queryAllByRole, getByLabelText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );

  const pokemonName = getByText('Pikachu');
  expect(pokemonName).toBeInTheDocument();
  const tipoPokemon = novoPokemon.type;
  expect(tipoPokemon).toBe('Electric');
  const pesoPokemon = getByText(`Average weight:${novoPokemon.averageWeight.value}${novoPokemon.averageWeight.measurementUnit}`);
  expect(pesoPokemon).toBeInTheDocument();
  const srcImagem = queryAllByRole('img')
  .find((imgSrc) => imgSrc.src.includes('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png'));
  expect(srcImagem).toBeInTheDocument();
  expect(srcImagem.alt).toBe(`${novoPokemon.name} sprite`);
  const maisInfo = getByText('More details');
  expect(maisInfo).toBeInTheDocument();
  const linkMaisInfo = maisInfo.href.endsWith(`/pokemons/${novoPokemon.id}`);
  expect(linkMaisInfo).toBe(true);
  fireEvent.click(maisInfo);
  expect(history.location.pathname).toBe(`/pokemons/${novoPokemon.id}`);
  const favoritandoPokemon = getByLabelText('Pokémon favoritado?');
  fireEvent.click(favoritandoPokemon);
  const pokemonFavoritado = queryAllByRole('img')
  .find((imagemSRC) => imagemSRC.src.endsWith('star-icon.svg'));
  expect(pokemonFavoritado).toBeInTheDocument();
  expect(pokemonFavoritado.alt).toBe(`${novoPokemon.name} is marked as favorite`);
});
