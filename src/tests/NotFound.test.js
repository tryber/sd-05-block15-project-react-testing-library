import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>), history,
  };
};

afterEach(cleanup);

test('', () => {
  const { getByText, history, queryByAltText } = renderWithRouter(<App />);
  history.push('/batatinha');

  expect(getByText('Page requested not found')).toBeInTheDocument();
  expect(getByText('Page requested not found').tagName).toBe('H2');

  expect(queryByAltText('Pikachu crying because the page requested was not found')).toBeInTheDocument();
  expect(queryByAltText('Pikachu crying because the page requested was not found'))
    .toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});

// it('deve testar um caminho não existente e a renderização do Not Found', () => {
//   const { getByText, history } = renderWithRouter(<App />);
//   history.push('/pagina/que-nao-existe/');
//   const noMatch = getByText(/Página não encontrada/i);
//   expect(noMatch).toBeInTheDocument();
// });

// Testes do arquivo NotFound.js
// A página deve conter um heading h2 com o texto Page requested not found 😭;

// A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.
