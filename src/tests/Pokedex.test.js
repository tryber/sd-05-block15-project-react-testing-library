import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

afterEach(cleanup);

const renderWithRoutero = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>), history,
  };
};

test('page should have information about selected pokemon', () => {
    history.push('/pokemons/25')
    const { getByText, history } = renderWithRoutero(<App />)
    const title = getByText('Pikachu Details');
    expect(title).toBeInTheDocument();
});