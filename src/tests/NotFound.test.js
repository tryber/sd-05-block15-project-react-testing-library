import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('teste do componente NotFound', () => {
  afterEach(cleanup);

  test('Página contém texto Page not found', () => {
    const { getByText } = render(<NotFound />);
    const message = getByText(/Page requested not found/);
    expect(message).toBeInTheDocument();
  });

  test('A página contém a imagem indicada', () => {
    const { getAllByRole } = render(<NotFound />);
    const image = getAllByRole('img');
    expect(image[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
