import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import About from '../components/About';

describe('2. Testes do arquivo About.js', () => {
  afterEach(cleanup);
  test('2.1 - A página "About" deve exibir informações sobre a Pokédex', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const infoPokedex = getByText(/About Pokédex/i);
    expect(infoPokedex).toBeInTheDocument();
  });

  test('2.2 - A página deve conter um heading h2 com o texto About Pokédex', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const veriTitulo = getByText('About Pokédex');
    expect(veriTitulo).toBeInTheDocument();
    expect(getByText('About Pokédex').tagName).toBe('H2');
  });

  test('2.3 - A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const veriTagP = container.querySelectorAll('p');
    expect(veriTagP).toHaveLength(2);
  });

  test('2.4 - A página deve conter a seguinte imagem de uma Pokédex', () => {
    const { queryByRole } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const verificaTagImg = queryByRole('img');
    expect(verificaTagImg).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
