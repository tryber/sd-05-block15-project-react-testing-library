import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('Testar titulo', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/about']}>
      <App />
    </MemoryRouter>,
  );
  const about = getByText(/About Pokédex/i);

  expect(about).toBeInTheDocument();
});

test('Testar imagem', () => {
  const { getByRole } = render(
    <MemoryRouter initialEntries={['/about']}>
      <App />
    </MemoryRouter>,
  );
  const img = getByRole('img');

  expect(img).toBeInTheDocument();

  expect(img.src).not.toBe('');
});
