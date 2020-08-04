import React from 'react';
import { render, cleanup } from '@testing-library/react';
import About from '../components/About';

describe('teste do arquivo about', () => {
  afterEach(cleanup);

  test('Página about informa sobre a pokédex', () => {
    const { getByText, getByRole } = render(<About />);
    const title = getByText(/About Pokédex/);
    expect(title).toBeInTheDocument();

    const paragraph1 = getByText(/This application simulates a Pokédex/);
    expect(paragraph1).toBeInTheDocument();

    const paragraph2 = getByText(/One can filter Pokémons by type/);
    expect(paragraph2).toBeInTheDocument();

    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
