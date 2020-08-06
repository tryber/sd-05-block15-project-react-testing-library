import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('testes no NotFound', () => {
  afterEach(cleanup);
  test('testando se A página contém heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const selectH2 = document.querySelector('h2');
    expect(selectH2).toBeInTheDocument();
    expect(selectH2).toHaveTextContent('Page requested not found');
  });

  test('testando se a imagem correta eh carregada', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const getImg = getAllByRole('img');
   // console.log(getImg[1].getAttributeNames());
    expect(getImg[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
