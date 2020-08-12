import React from 'react';
import { render, cleanup } from '@testing-library/react';
import About from '../components/About';

// 2. Testes do arquivo About.js
// A página "About" deve exibir informações sobre a Pokédex

// A página deve conter um heading h2 com o texto About Pokédex;

// A página deve conter dois parágrafos com texto sobre a Pokédex;

// A página deve conter a seguinte imagem de uma Pokédex: https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.
test('Checkando se o a página é a correta', () => {
  const { getByText } = render(<About />);
  const aboutCheck = getByText(/One can filter/i);
  expect(aboutCheck).toBeInTheDocument();
});
describe('Teste da página About', () => {
  afterEach(cleanup);

  test('Testando H2', () => {
    const { getByText } = render(<About />);
    const aboutText = getByText(/About Pokédex/i);
    expect(aboutText).toBeInTheDocument();
  });

  test('Testando imagem', () => {
    const { getByAltText } = render(<About />);
    const aboutImg = getByAltText('Pokédex');
    expect(aboutImg).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
