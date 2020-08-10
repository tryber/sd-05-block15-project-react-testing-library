import React from 'react';
import { cleanup, render } from '@testing-library/react';
import About from '../components/About';

afterEach(cleanup);

test('A página "About" deve exibir informações sobre a Pokédex', () => {
  const { queryByText } = render(<About />);
  expect(queryByText(/About Pokédex/i)).toBeInTheDocument();
});

test('A página deve conter um heading h2 com o texto About Pokédex', () => {
  const { queryByText, getByRole } = render(<About />);
  expect(getByRole('heading')).toBeInTheDocument();
  expect(queryByText('About Pokédex').tagName).toBe('H2');
});

test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
  const { container } = render(<About />);
  expect(container.querySelectorAll('p').length).toBe(2);
});

test('A página deve conter a referida imagem de uma Pokédex', () => {
  const { getByRole } = render(<About />);
  expect(getByRole('img')).toBeInTheDocument();
  expect(getByRole('img').src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
