import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do arquivo Pokémon', () => {
  afterEach(cleanup);

  test('Deve ser retornado um card com as informações de determinado pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const name = getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name.innerHTML).toMatch('Pikachu');
    const type = getByTestId('pokemonType');
    expect(type).toBeInTheDocument();
    expect(type.innerHTML).toMatch('Electric');
    const weight = getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight.innerHTML).toMatch('Average weight:6.0kg');
  });

  test('A imagem deve conter um atributo src com a URL da imagem do pokémon', () => {
    const { getByRole, getByAltText } = renderWithRouter(<App />);
    const img = getByRole('img');
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(getByAltText('Pikachu sprite')).toBeInTheDocument();
  });

  test('O pokémon exibido na Pokédex deve conter um link de navegação para exibir detalhes deste pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const link = getByText(/more details/i);
    expect(link.href).toMatch('/pokemons/25');
  });

  test('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const details = getByText(/more details/i);
    fireEvent.click(details);
    const fav = getByText(/pokémon favoritado/i);
    fireEvent.click(fav);
    const favPoke = getByAltText(/Pikachu is marked as favorite/i);
    expect(favPoke).toBeInTheDocument();
    expect(favPoke.src).toMatch('/star-icon.svg');
  });
});
