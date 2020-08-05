import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { NotFound } from '../components';

describe('Teste da página NotFound', () => {
  afterEach(cleanup);

  test('A página deve conter um heading h2 com o texto Page requested not found 😭', () => {
    const { getByRole } = render(<NotFound />);
    const h2 = getByRole('heading');
    expect(h2).toHaveTextContent('Page requested not found 😭');
  });

  test('A página deve exibir a imagem', () => {
    const { getAllByRole } = render(<NotFound />);
    const image = getAllByRole('img');
    expect(image[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
