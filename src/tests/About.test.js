import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
import About from '../components/About';

test('A página "About" deve exibir informações sobre a Pokédex', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>,
  );
  history.push('/about');
  const path = history.location.pathname;
  expect(path).toBe('/about');
});

test('A página deve conter um heading h2 com o texto About Pokédex', () => {
  const { getByRole } = render(<About />);
  const h2 = getByRole('heading');
  expect(h2).toBeInTheDocument();
  expect(h2.innerHTML).toBe('About Pokédex');
  expect(h2.tagName).toBe('H2');
});

test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
  const { container } = render(<About />);
  const paragraphs = container.querySelectorAll('p');
  expect(paragraphs.length).toBe(2);
});

test('A página deve conter a seguinte imagem de uma Pokédex: https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
  const { getByRole } = render(<About />);
  const img = getByRole('img');
  expect(img.src).toBe(
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
