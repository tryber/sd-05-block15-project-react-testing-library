import React from 'react';
import { cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testes NotFound', () => {
  afterEach(cleanup);

  test('A página deve conter h2 com o texto Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const h2 = getByRole('heading');
    expect(h2).toHaveTextContent(/Page requested not found/i);
  });

  test('A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
