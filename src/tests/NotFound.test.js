import React from 'react';
import renderWithRouter from './App.test';
import { NotFound } from '../components';

test('A página deve conter um heading h2 com o texto Page requested not found 😭', () => {
  const { container, getByText } = renderWithRouter(<NotFound />);
  expect(container.innerHTML.includes('h2'));
  expect(getByText(/page requested not found/i)).toBeInTheDocument();
});

test('A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const { getByRole } = renderWithRouter(<About />);
  expect(getByRole(/img/i)).toHaveAttribute( 'src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif' );
});
