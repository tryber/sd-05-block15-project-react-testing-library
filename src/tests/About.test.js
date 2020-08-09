import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import About from '../components/About';

const renderWithRouter = (component) => {
  const historyAbout = createMemoryHistory();
  return {
    ...render(<Router history={historyAbout}>{component}</Router>), history,
  };
};

describe('A página "About" deve exibir informações sobre a Pokédex', () => {
  test('A página deve conter um heading h2 com o texto About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const h2Test = getByText(/About Pokédex/);
    expect(h2Test).toBeInTheDocument();
    expect(h2Test.tagName).toBe('H2');
  });

  test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const contP = container.querySelectorAll('p').length;
    expect(contP).toBe(2);
  });

  test('A página deve conter a seguinte imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByAltText(/Pokédex/i);
    expect(img.src).toBe(url);
  });
});
