import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

test('exibir informações sobre a Pokedéx', () => {
  const { getByText, container, getByRole } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const aboutPokedex = getByText(/About Pokédex/);
  expect(aboutPokedex).toBeInTheDocument();
  expect(aboutPokedex.tagName).toBe('H2');
  const paragraphs = container.querySelectorAll('p');
  expect(paragraphs.length).toBe(2);
  const imagem = getByRole('img');
  expect(imagem.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
