import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../services/renderWithRouter';

test('Verificando se existe um h2 com o texto Page requested not found 😭', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const h2 = getByRole('heading');
  expect(h2).toHaveTextContent('Page requested not found 😭');
});

test('Verificando se existe uma imagem com o src https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const img = getByAltText('Pikachu crying because the page requested was not found');
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
