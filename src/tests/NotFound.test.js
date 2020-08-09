import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';

const renderWithRouter = (component) => {
  const historyNot = createMemoryHistory();
  return {
    ...render(<Router history={historyNot}>{component}</Router>), history,
  };
};

describe('Testes do arquivo NotFound.js', () => {
  afterEach(cleanup);

  test('A página deve conter um heading h2 com o texto Page requested not found 😭', () => {
    const { getByText } = renderWithRouter(<NotFound />);

    const h2test = getByText(/Page requested not found/);
    expect(h2test).toBeInTheDocument();
    expect(h2test.tagName).toBe('H2');
  });

  test('A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = getByAltText(/Pikachu crying because the page requested was not found/);
    expect(img.src).toBe(url);
    expect(img).toBeInTheDocument();
  });
});
