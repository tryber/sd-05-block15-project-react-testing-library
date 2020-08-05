import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (compon) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{compon}</Router>), history,
  };
};

test('Entrar em uma URL desconhecida exibe a página Not Found', () => {
  const { getByRole } = renderWithRouter(<App />);

  expect(getByRole('img',
  { alt: 'Pikachu crying because the page requested was not found' },
  )).toBeInTheDocument();
});
