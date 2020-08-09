import React from 'react';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';
// import { render, cleanup } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testes da página about', () => {
  // afterEach(cleanup);

  test('A página "About" deve exibir informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const info = getByText(/about pokédex/i);
    expect(info).toBeInTheDocument();
  });

  test('A página deve conter um heading h2 com o texto About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const h2 = getByText(/about pokédex/i);
    expect(h2).toBeInTheDocument();
  });

  test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const p1 = getByText(/This application simulates a Pokédex/i);
    expect(p1).toBeInTheDocument();
    const p2 = getByText(/One can filter Pokémons by type/i);
    expect(p2).toBeInTheDocument();
  });

  test('A página deve conter a imagem de uma Pokédex:', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
