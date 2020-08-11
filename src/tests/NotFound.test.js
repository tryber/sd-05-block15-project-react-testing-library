import React from 'react';
import renderRoute from '../services/render';
import { NotFound } from '../components';

test('Verify if has h2 heading', () => {
  const { getByRole } = renderRoute(<NotFound />);
  const H2 = getByRole('heading');
  expect(H2).toHaveTextContent('Page requested not found 😭');
});

test('verify if has img', () => {
  const { getByAltText } = renderRoute(<NotFound />);
  const Img = getByAltText('Pikachu crying because the page requested was not found');
  expect(Img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});