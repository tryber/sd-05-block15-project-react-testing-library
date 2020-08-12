import React from 'react';
import { cleanup } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testes About', () => {
  afterEach(cleanup);

  test('A página "About" deve conter informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const info = getByText(/digital encliclopedia containing all Pokémons/i);
    expect(info).toBeInTheDocument();
  });

  test('A página deve conter h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const h2 = getByRole('heading');
    expect(h2).toHaveTextContent(/About Pokédex/i);
  });

  test('A página deve conter a seguinte imagem: https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    expect(img.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
