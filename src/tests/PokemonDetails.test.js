import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Deve conter mais informações sobre apenas o pokémon selecionado', () => {
  test('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon', () => {
    const history = createMemoryHistory();
    const {  } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
  });
});
