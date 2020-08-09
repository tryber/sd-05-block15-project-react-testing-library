import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

const renderWithRouters = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>), history,
  };
};

test('link about should render favorite pokemons page', () => {
  const { getByText, history } = renderWithRouters(<App />);
  fireEvent.click(getByText(/favorite pokémons/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/favorites');
});

test('about page should have heading Favorite Pokemons', () => {
  const { getByRole } = renderWithRouters(<FavoritePokemons />);
  const h2 = getByRole('heading');
  expect(h2).toBeInTheDocument();
  expect(h2.innerHTML).toBe(' Favorite pokémons ');
});

test('if theres no favorite pokemons, show not found message', () => {
  const { getByText } = renderWithRouters(<FavoritePokemons pokemons={[]} />);
  const notFound = getByText(/No favorite pokemon found/i);
  expect(notFound).toBeInTheDocument();
});

test('if theres no favorite pokemons, do not show cards', () => {
  const { queryByText } = renderWithRouters(<FavoritePokemons pokemons={pokemons.slice(0, 1)} />);
  const name = queryByText(/caterpie/i);
  expect(name).not.toBeInTheDocument();
});

test('if there are favorite pokemons, show cards', () => {
  const { queryByText } = renderWithRouters(<FavoritePokemons pokemons={pokemons.slice(0)} />);
  const name = queryByText(/pikachu/i);
  expect(name).toBeInTheDocument();
});
