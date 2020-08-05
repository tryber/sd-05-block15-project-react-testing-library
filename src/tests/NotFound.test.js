import React from 'react';
import { createMemoryHistory } from 'history';
import { NotFound } from '../components';
import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

function renderWithRouter(ui, { route = '/', history = createMemoryHistory(
  { initialEntries: [route] }) } = {}) {
    return {
      ...render(<Router history={history}>{ui}</Router>),
      history,
    };
  }

describe('Teste da página NotFound', () => {
  afterEach(cleanup);

  test('A página deve conter um heading h2 com o texto Page requested not found 😭', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const h2 = getByRole('heading');
    expect(h2).toHaveTextContent('Page requested not found 😭')
  });

  test('A página deve exibir a imagem', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const image = getAllByRole('img');
    expect(image[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});