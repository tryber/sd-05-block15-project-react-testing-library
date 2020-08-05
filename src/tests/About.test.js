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
  const textAboutPokedex = queryByText('About Pokédex');
  expect(textAboutPokedex).toBeInTheDocument();
  expect(container.querySelector('h2')).toBeInTheDocument();
  expect(textAboutPokedex.tagName).toBe('H2');
});

test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
  const { container } = render(<About />);
  const paragraphs = container.querySelectorAll('p');
  // also working: document.querySelectorAll('p');
  expect(paragraphs.length).toBe(2);
});

test('A página deve conter a referida imagem de uma Pokédex', () => {
  const { getByRole } = render(<About />);
  const imgPokedex = getByRole('img');
  expect(imgPokedex).toBeInTheDocument();
  expect(imgPokedex.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  // expect(queryByRole('img')).toBeInTheDocument();
  // expect(queryByRole('img')).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  // expect(getByAltText('img')).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  // expect(getByAltText('Pokédex').tagName).toMatch(/img/i);
});
