import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';
// vai Jesus

test('Testes do arquivo About.js', () => {
  const { getByText, container } = renderWithRouter(<About />);
  expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  expect(container.querySelector('h2')).toBeInTheDocument();
  expect(container.querySelectorAll('p').length).toEqual(2);
  expect(container.querySelector('img').src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
