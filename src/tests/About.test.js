import React from 'react';
import { cleanup, render } from '@testing-library/react';
import About from '../components/About';

afterEach(cleanup);

test('A página "About" deve exibir informações sobre a Pokédex', () => {
  const { getByText } = render(<About />);
  const infoPokedex = getByText(/About Pokédex/i);
  expect(infoPokedex).toBeInTheDocument();
});

test('A página deve conter um heading h2 com o texto About Pokédex', () => {
  const { queryByText, container } = render(<About />);
  const tPokedex = queryByText('About Pokédex');
  expect(tPokedex).toBeInTheDocument();
  expect(container.querySelector('h2')).toBeInTheDocument();
  expect(tPokedex.tagName).toBe('H2');
});

test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
  const { container } = render(<About />);
  const paragrafo = container.querySelectorAll('p');
  expect(paragrafo.length).toBe(2);
});

test('A página deve conter a seguinte imagem de uma Pokédex', () => {
  const { getByRole } = render(<About />);
  const imgP = getByRole('img');
  expect(imgP).toBeInTheDocument();
  expect(imgP.src).toBe(
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
