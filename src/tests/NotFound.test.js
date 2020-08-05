import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>), history,
  };
};

test('Entrar em uma URL desconhecida exibe a página Not Found', () => {
  const { getByRole } = renderWithRouter(<App />);

  expect(getByRole('img',
  {alt: 'Pikachu crying because the page requested was not found'}
  )).toBeInTheDocument();
});
