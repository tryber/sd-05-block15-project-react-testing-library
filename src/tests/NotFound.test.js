import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import { NotFound } from '../components';

test('Verify if has h2 heading', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const h2 = getByRole('heading');
  expect(h2).toHaveTextContent('Page requested not found 😭');
});

test('verify if has img', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const img = getByAltText('Pikachu crying because the page requested was not found');
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
