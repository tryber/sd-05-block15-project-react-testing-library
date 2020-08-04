import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('teste do arquivo about', () => {
  afterEach(cleanup);

  test('Mostra msg se não houverem pokemons', () => {
    const { getByText } = render(<FavoritePokemons />);
    const empty = getByText(/No favorite pokemon found/);
    expect(empty).toBeInTheDocument();
  });

  test('Exibe pokemon favoritado', () => {
    const { getByText, getByLabelText, getByTestId } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const moreDetails = getByText(/More details/);
    fireEvent.click(moreDetails);
    const pokemonFavoritado = getByLabelText(/Pokémon favoritado/);
    expect(pokemonFavoritado).toBeInTheDocument();
    fireEvent.click(pokemonFavoritado);
    const favorites = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorites);
    const favoritePokemon = getByText(pokemonName.innerHTML);
    expect(favoritePokemon).toBeInTheDocument();
  });

  test('Não exibe pokemon não favoritado', () => {
    const { getByText, getByTestId, getByRole } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const name = pokemonName.innerHTML;
    const moreDetails = getByText(/More details/);
    fireEvent.click(moreDetails);

    const checkedBox = getByRole('checkbox');
    fireEvent.change(checkedBox, { target: { checked: false } });
    console.log(checkedBox.checked);

    const favorites = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorites);

    const favoritePokemon = getByText(name);
    console.log(favoritePokemon.innerHTML);
    expect(favoritePokemon).toBeInTheDocument();
  });
});
