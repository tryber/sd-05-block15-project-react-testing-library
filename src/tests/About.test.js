import React from 'react';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

test('Verificando se existe um h2 com o texto About Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const h2 = getByRole('heading');
  expect(h2).toHaveTextContent('About Pokédex');
});

test('Verificando se existe dois parágrafos', () => {
  const { container } = renderWithRouter(<About />);
  const p = container.querySelectorAll('p');
  expect(p.length).toBe(2);
});

test('Verificando se existe uma imagem com o src https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
  const { getByRole } = renderWithRouter(<About />);
  const img = getByRole('img');
  expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
