import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('Page requested not found', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/blealvbir']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Page requested not found')).toBeInTheDocument();
});

test('A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const { getByAltText } = render(
    <MemoryRouter initialEntries={['/dbzdfbf']}>
      <App />
    </MemoryRouter>,
  );

  const gif = getByAltText(/not found/i);
  expect(gif).toBeInTheDocument();
  expect(gif.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
