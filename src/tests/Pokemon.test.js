import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Testes do arquivo Pokemon.js', () => {
  test('testes', () => {
    const { getByText, getByRole, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const name = getByText('Pikachu');
    expect(name).toBeInTheDocument();

    const peso = getByText('Average weight:6.0kg');
    expect(peso).toBeInTheDocument();

    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe('Pikachu sprite');

    const link = getByText('More details');
    expect(link.href).toBe('http://localhost/pokemons/25');
  });
});
