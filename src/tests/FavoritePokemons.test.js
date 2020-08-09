import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste da página FavoritePokémons', () => {
  afterEach(cleanup);

  test('Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  test('A página deve exibir todos os cards de pokémons favoritados', () => {
    const { getByText, getByTestId, getByLabelText } = renderWithRouter(<App />);
    const pokemon = getByTestId('pokemon-name');
    const details = getByText(/more details/i);
    fireEvent.click(details);
    const pokFav = getByLabelText(/pokémon favoritado/i);
    expect(pokFav).toBeInTheDocument();
    fireEvent.click(pokFav);
    const favPok = getByText(/favorite pokémons/i);
    fireEvent.click(favPok);
    const favoritePokemon = getByText(pokemon.innerHTML);
    expect(favoritePokemon).toBeInTheDocument();
  });
});
