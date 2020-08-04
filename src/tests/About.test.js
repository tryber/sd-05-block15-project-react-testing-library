import React from 'react';
import { createMemoryHistory } from 'history';
import About from '../components/About';
import renderWithRouter from './App.test';

test('A página "About" deve exibir informações sobre a Pokédex', () => {
  const { container, getByText } = renderWithRouter(<About />);
  const history = createMemoryHistory();
  history.push('/about');
  expect(container.innerHTML.includes('h2'));
  expect(getByText(/about pokédex/i)).toBeInTheDocument();
});

test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
  const { container } = renderWithRouter(<About />);
  expect(container.querySelectorAll('p').length);
});

test('A página deve conter a imagem de uma Pokédex:', () => {
  const { getByRole } = renderWithRouter(<About />);
  expect(getByRole(/img/i)).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
