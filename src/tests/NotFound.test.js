import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './App.test';

describe('testando funcionalidades componente NotFound', () => {
  test('A página deve conter um heading h2 com o texto Page requested not found', () => {
    const { container, getByText } = renderWithRouter(<NotFound />);
    expect(container.innerHTML.includes('h2'));
    expect(getByText(/page requested not found/i)).toBeInTheDocument();
  });
  test('A pagina deve exibir a imagem do pokémon', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    expect(getByAltText(/pikachu crying because the page requested was not found/i))
      .toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
