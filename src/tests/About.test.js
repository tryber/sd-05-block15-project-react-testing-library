import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('contains a h2 heading with the text "About Pokédex"', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/about']}>
      <App />
    </MemoryRouter>,
  );

  const heading = getByText('About Pokédex');
  expect(heading).toBeInTheDocument();
});

test('contains two paragraphs with text about the Pokedéx', () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/about']}>
      <App />
    </MemoryRouter>,
  );

  // there's a p tag
  expect(container.querySelector('p')).toBeInTheDocument();
  
  // there's two
  const paragraphs = container.querySelectorAll('p');
  expect(paragraphs.length).toBe(2);
});

test('contains an specific image', () => {
  const { getByRole } = render(
    <MemoryRouter initialEntries={['/about']}>
      <App />
    </MemoryRouter>,
  );

  const img = getByRole('img');
  expect(img).toBeInTheDocument();

  expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
