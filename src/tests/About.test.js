import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

test('inf. of Pokedex', () => {
  const { getByText, getAllByTestId, getByRole } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>
  );
  expect(getByText('About Pokédex')).toBeInTheDocument();
  const paragraph = getAllByTestId('paragraph');
  expect(paragraph.length).toBe(2);
  const imagem = getByRole('img', {
    src:
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  });
  expect(imagem).toBeInTheDocument();
});
