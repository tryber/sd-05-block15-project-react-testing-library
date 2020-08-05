import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testa as informações do card do pokemon', () => {
  afterEach(cleanup);

  test('retorna um card com informações do pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.innerHTML).toMatch('Pikachu');
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType.innerHTML).toMatch('Electric');
    const pesoPokemon = getByTestId('pokemon-weight');
    expect(pesoPokemon).toBeInTheDocument();
    expect(pesoPokemon.innerHTML).toMatch('Average weight:6.0kg');
  });

  test('testa a imagem do pokemon', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const pokemonImage = getAllByRole('img')[0];
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toMatch('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage.alt).toMatch(/sprite/);
  });

  test('link para mais detalhes', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    const buttonDetails = getAllByRole('link')[3];
    expect(buttonDetails).toBeInTheDocument();
    const linkPath = buttonDetails.pathname;
    expect(buttonDetails.href).toMatch('/pokemons/25');
    fireEvent.click(buttonDetails);
    expect(history.location.pathname).toMatch(linkPath);
  });

  test('pokemons favoritos possuem marcação', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon pokemon={pokemons[0]} isFavorite />,
    );
    const imgFavorito = getAllByRole('img')[1];
    expect(imgFavorito.src).toMatch(/\/star-icon.svg/);
    expect(imgFavorito.alt).toMatch('Pikachu is marked as favorite');
  });
});
