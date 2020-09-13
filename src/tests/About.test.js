import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('Testando tudo no About', () => {
  const { getByText, getByRole } = render(
    <MemoryRouter initialEntries={['/about']}>
      <App />
    </MemoryRouter>,
  );
  const about = getByText(/About Pokédex/i);
  const imagem = getByRole('img');
  expect(about).toBeInTheDocument();
  expect(imagem).toBeInTheDocument();
  expect(imagem.src).not.toBe('');
});
