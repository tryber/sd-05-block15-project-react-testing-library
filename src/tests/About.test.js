import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('A página "About" deve exibir informações sobre a Pokédex', () => {
  const { getByText, container } = renderWithRouter(<About />);
  expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  expect(container.querySelector('h2')).toBeInTheDocument();
  expect(container.querySelector('img').src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  expect(container.querySelectorAll('p').length).toEqual(2);
});
