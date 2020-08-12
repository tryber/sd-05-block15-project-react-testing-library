import React from 'react';
import Pokemon from '../components/Pokemon';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('Deve ser retornado um card com as informações de determinado pokémon', () => {
  const history = createMemoryHistory();
  const { getByTestId } = render(
    <Router history={history}>
      <Pokemon />
    </Router>
  );
  expect(getByTestId("pokemon-overview")).toBeInTheDocument();
});
