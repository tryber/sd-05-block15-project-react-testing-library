import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

test('inf. of Pokedex', () => {
  const { getByText, getByRole, container } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>
  );
  expect(getByText('About Pokédex')).toBeInTheDocument();
  expect(container.querySelectorAll('p').length).toBe(2);
  const imagem = getByRole('img');
  expect(imagem.src).toBe(
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'
  );
});
