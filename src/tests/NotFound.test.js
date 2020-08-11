// 4. Testes do arquivo NotFound.js
// A página deve conter um heading h2 com o texto Page requested not found 😭;

// A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.
import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste NotFound page', () => {
  test('Teste texto da página not found', () => {
    const { getByText } = render(<NotFound />);
    const notFoundText = getByText(/Page requested not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
  test('Testando se encontra o Gif correspondente da página', () => {
    const { getByAltText } = render(<NotFound />);
    const notFoundGif = getByAltText('Pikachu crying because the page requested was not found');
    expect(notFoundGif).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
