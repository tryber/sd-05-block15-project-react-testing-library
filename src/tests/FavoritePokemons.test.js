import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('Tentando conjunto de links de verificação', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const favorito = getByText(/No favorite pokemon found/i);
  expect(favorito).toBeInTheDocument();
});
