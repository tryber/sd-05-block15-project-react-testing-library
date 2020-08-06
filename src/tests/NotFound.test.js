import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('A página deve conter um heading h2 com o texto Page requested not found', () => {
  const { getByText } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );
  const h2 = getByText(/Page requested not found/i);
  expect(h2).toBeInTheDocument();
  expect(h2.tagName).toBe('H2');
});

test('A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const { container } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );
  const image = container.querySelector('img');
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
