import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Mensagem Not found', () => {
  const { getByText } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const notFound = getByText(/Page requested not found 😭/i);
  expect(notFound).toBeInTheDocument('');
});

test('Testar imagem NotFound', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const img = getByRole('img');

  expect(img).toBeInTheDocument();

  expect(img.src).not.toBe('');
});
