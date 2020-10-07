import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, cleanup, fireEvent, getByText } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('teste das rotas', () => {
  afterEach(cleanup);
  test('home', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText(/home/i)).toBeInTheDocument();
  });
  test('about', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    fireEvent.click(getByText(/about/i));
    expect(history.location.pathname).toBe('/about');
  });
  test('favorite pokemons', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    fireEvent.click(getByText(/favorite pokémons/i));
    expect(history.location.pathname).toBe('/favorites');
  });

  test('not found', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    history.push('/404');
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
