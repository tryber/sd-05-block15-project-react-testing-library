import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('notFound', () => {
  afterEach(cleanup);
  test('A página deve conter um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const headh2 = document.querySelector('h2');
    expect(headh2).toBeInTheDocument();
    expect(headh2).toHaveTextContent('Page requested not found');
  });

  test('A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const pikaPika = getAllByRole('img');
    expect(pikaPika[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
