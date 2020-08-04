import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('testes no NotFound', () => {
  test('testando se A página contém heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const selectH2 = document.querySelector('h2');
    expect(selectH2).toBeInTheDocument();
    expect(selectH2).toHaveTextContent('Page requested not found');
  });
});
