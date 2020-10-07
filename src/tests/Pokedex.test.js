import { createMemoryHistory } from 'history';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import React from 'react';
import App from '../App';

describe('funcionamento da pokedex', () => {
  afterEach(cleanup);
  test('mostra que não há pokemons quando nenhum foi favoritado', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    fireEvent.click(getByText(/favorite pokémons/i));
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  test('não mostra nenhuma carta não favoritada', () => {

  });
});
