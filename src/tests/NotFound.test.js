import React from 'react';
import renderWithRouter from '../types/renderWithRouter';
import NotFound from '../components/NotFound';

test('A página deve conter um heading `h2` com o texto `Page requested not found 😭`', () => {
  const { container, getByText } = renderWithRouter(<NotFound />);
  expect(container.querySelector('h2')).toBeInTheDocument();
  expect(getByText(/Page requested not found/i)).toBeInTheDocument();
});

test('A página deve exibir a imagem `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`', () => {
  const { container } = renderWithRouter(<NotFound />);
  const procuraImg = container.querySelector('img');
  expect(procuraImg).toBeInTheDocument();
  expect(procuraImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
