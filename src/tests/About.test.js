import React from 'react';
import About from '../components/About';
import renderWithRouter from '../components/renderWithRouter';

test('A página "About" deve exibir informações sobre a Pokédex', () => {
  const { getAllByText } = renderWithRouter(<About />);
  const aboutPokedex = getAllByText(/Pokédex/i);
  expect(aboutPokedex.length).toBe(2);
});

test('A página deve conter um heading h2 com o texto About Pokédex', () => {
  const { getByText, getByRole } = renderWithRouter(<About />);
  const elementH2 = getByText(/About Pokédex/);
  expect(elementH2).toBeInTheDocument();
  // expect(elementH2.tagName).toEqual("H2");
  const h2 = getByRole('heading', { tagName: 'h2' });
  expect(h2).toBeInTheDocument();
});

test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
  const { getAllByText, getByText } = renderWithRouter(<About />);
  const elementP = getAllByText(/Pokédex/i);
  expect(elementP.length).toBe(2);
  const p = getByText(/This application simulates/i);
  expect(p).toBeInTheDocument();
});

test('A página deve conter a seguinte imagem de uma Pokédex', () => {
  const { getByRole, getByAltText } = renderWithRouter(<About />);
  const img = getByRole('img');
  expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  expect(getByAltText('Pokédex')).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
