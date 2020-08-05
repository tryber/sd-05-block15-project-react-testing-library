import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { NotFound } from '../components';

afterEach(cleanup);

describe('Testes do arquivo NotFound.js', () => {
  test('A página deve conter um heading h2 com o texto Page requested not found 😭', () => {
    const { getByText } = render(<NotFound />);

    expect(getByText('Page requested not found')).toBeInTheDocument();
    expect(getByText('Page requested not found').tagName).toBe('H2');
  });

  test('A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { queryByAltText } = render(<NotFound />);

    expect(queryByAltText('Pikachu crying because the page requested was not found')).toBeInTheDocument();
    expect(queryByAltText('Pikachu crying because the page requested was not found')).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
