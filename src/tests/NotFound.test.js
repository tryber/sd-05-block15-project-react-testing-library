import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../components/renderWithRouter';

test('A página deve conter um heading h2 e texto Page requested not found', () => {
  const { getByRole, getByText } = renderWithRouter(<NotFound />);
  const h2 = getByText(/Page requested not found/i);
  expect(h2).toBeInTheDocument();
  const elementoh2 = getByRole('heading', { tagName: 'h2' });
  expect(elementoh2).toBeInTheDocument();
});

test('A página deve exibir a imagem x', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  // const img = getByAltText('Pikachu crying because the page requested was not found');
  // expect(img.src).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  expect(getByAltText('Pikachu crying because the page requested was not found')).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
