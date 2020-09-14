import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('Favorite Pokemon', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/favorites']}>
      <App />
    </MemoryRouter>,
  );
  const favorito = getByText(/No favorite pokemon found/);
  expect(favorito).toBeInTheDocument('');
});
