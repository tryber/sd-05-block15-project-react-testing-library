import React from 'react';
import About from '../components/About';
import renderWithRouter from '../types/renderWithRouter';

test('A página "About" deve exibir informações sobre a Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const textAbout = getByText(/This application simulates a Pokédex/i);
  expect(textAbout).toBeInTheDocument();
});

test('A página deve conter um heading `h2` com o texto `About Pokédex`', () => {
  const { getByText, container } = renderWithRouter(<About />);
  const textAbout = getByText(/About Pokédex/i);
  expect(textAbout).toBeInTheDocument();
  const procuraH2 = container.querySelector('h2');
  expect(procuraH2).toBeInTheDocument();
});

test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
  const { container } = renderWithRouter(<About />);
  const procuraA = container.querySelectorAll('p');
  expect(procuraA.length).toBe(2);
});

test('A página deve conter a seguinte imagem de uma Pokédex', () => {
  const { container } = renderWithRouter(<About />);
  const procuraImg = container.querySelector('img');
  expect(procuraImg.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
