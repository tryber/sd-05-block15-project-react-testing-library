import React from 'react';
import { cleanup, render } from '@testing-library/react';
import About from '../components/About';
afterEach(cleanup);

test('A página "About" deve exibir informações sobre a Pokédex', () => {
  const {getByText} = render(<About />);
  const informacoesp = getByText(/About Pokédex/i);
  expect(informacoesp).toBeInTheDocument();
});

test('A página deve conter dois parágrafos com texto sobre a Pokédex;', () => {
  const { getByText,container}  = render(<About />);
  const informacoes = getByText('About Pokédex');
  expect(informacoes).toBeInTheDocument();
  expect(container.querySelector('h2')).toBeInTheDocument();
  expect(informacoes.tagName).toBe('H2');
})
test('A página deve conter dois parágrafos com texto sobre a Pokédex;', () =>{
  const { container } = render(<About />);
  const p = container.querySelectorAll('p');
  expect(p.length).toBe(2); 
})

test('A página deve conter a seguinte imagem de uma Pokédex: ', () => {
  const {getByRole} = render(<About />);
  const img= getByRole('img');
  expect(img).toBeInTheDocument();
  expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png')
})
