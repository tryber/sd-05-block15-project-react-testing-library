import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testes do arquivo Pokemon.js', () => {
  test('testes', () => {
    const { getByText, getByRole, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const name = getByTestId('pokemon-name');
    expect(name.innerHTML).toBe('Pikachu');

    const tipo = getByTestId('pokemonType');
    expect(tipo.innerHTML).toBe('Electric');

    const peso = getByTestId('pokemon-weight');
    expect(peso.innerHTML).toBe('Average weight:6.0kg');

    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe('Pikachu sprite');

    const link = getByText('More details');
    expect(link.href).toBe('http://localhost/pokemons/25');
  });

  test('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
    const history = createMemoryHistory();
    const { getByAltText } = render(
      <Router history={history}>
        <Pokemon pokemon={pokemons[0]} isFavorite />
      </Router>,
    );
    const img = getByAltText('Pikachu is marked as favorite');
    expect(img).toBeInTheDocument();
    expect(img.src).toMatch(/\/star-icon.svg/);
  });
});
