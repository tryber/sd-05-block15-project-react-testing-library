import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Tentando conjunto de links de verificação', () => {
  const { getByText } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const notFound = getByText(/Page requested not found 😭/i);
  expect(notFound).toBeInTheDocument('');
});
