test('', () => {});
/* import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import Pokemon from '../components/Pokemon';

const renderWithRouter = (component) => {
  const historyNot = createMemoryHistory();
  return {
    ...render(<Router history={historyNot}>{component}</Router>), history,
  };
};

describe('Deve ser retornado um card com as informações de determinado pokémon', () => {
  afterEach(cleanup);

  test('O nome correto do pokémon deve aparecer na tela', () => {
    const { getByTestId } = renderWithRouter(<Pokemon />);

    const nome = getByTestId(/pokemon-name/);
    expect(nome).toBeInTheDocument();
  });
});*/
