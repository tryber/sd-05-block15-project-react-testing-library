import React from 'react';
import { render, fireEvent, getAllByRole } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
// import Pokemon from '../components/Pokemon';
// import pokemons from '../data';

describe('Testes do arquivo Pokemon.js', () => {
  test('testes', () => {
    const { getByText, getByRole, getByTestId, getAllByRole } = render(
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

    fireEvent.click(link);
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Home'));

    const icone = getAllByRole('img');
    expect(icone[1].src).toBe('http://localhost/star-icon.svg');
    expect(icone[1].alt).toBe('Pikachu is marked as favorite');
  });
});
