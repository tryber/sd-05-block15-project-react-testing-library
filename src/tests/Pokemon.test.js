import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { cleanup, render, fireEvent } from '@testing-library/react';
// import Pokédex from '../components/Pokedex';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

test('the app should render one pokemon "card" with it.s name, type and weight', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName.innerHTML).toBe(pokemons[0].name);
  const pokemonType = getByTestId('pokemonType');
  expect(pokemonType.innerHTML).toBe(pokemons[0].type);
  const pokemonWeight = getByTestId('pokemon-weight');
  expect(pokemonWeight.innerHTML).toContain(pokemons[0].averageWeight.value);
  expect(pokemonWeight.innerHTML).toContain(pokemons[0].averageWeight.measurementUnit);
});

test('renders specific image with itś attributes', () => {
  const { queryByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(queryByRole('img')).toBeInTheDocument();
  expect(queryByRole('img')).toHaveAttribute('src', pokemons[0].image);
  expect(queryByRole('img')).toHaveAttribute('alt', 'Pikachu sprite');
});

test('Pokemon should render a "button" to "more details"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const Btn = getByText(/More details/);
  expect(Btn).toBeInTheDocument();
  expect(Btn).toHaveAttribute('href', '/pokemons/25');
});

function renderWithRouterDois(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return { ...render(<Router history={history}>{ui}</Router>), history };
}

test('More details navigation', () => {
  const { getByText, history } = renderWithRouterDois(<App />);
  const Btn = getByText(/More details/);
  fireEvent.click(Btn);
  const detailPath = history.location.pathname;
  expect(detailPath).toBe('/pokemons/25');
});

test('renders specific image when favorite', () => {
  const { getAllByRole, getByText, getByLabelText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const One = getAllByRole('img');
  expect(One.length).toBe(1);
  const Btn = getByText(/More details/);
  fireEvent.click(Btn);
  fireEvent.click(getByLabelText('Pokémon favoritado?'));
  fireEvent.click(getByText(/Home/i));

  const second = getAllByRole('img')[1];
  expect(second).toHaveAttribute('src', '/star-icon.svg');
  expect(second).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
