import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

afterEach(cleanup);

const renderWithRouterx = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>), history,
  };
};

test('render a card with details', () => {
  const { getByText } = renderWithRouterx(<Pokemon pokemon={pokemons[0]} />);
  const name = getByText(/pikachu/i);
  expect(name).toBeInTheDocument();
  const type = getByText(/Electric/i);
  expect(type).toBeInTheDocument();
  const weight = getByText(/Average weight:6.0kg/i);
  expect(weight).toBeInTheDocument();
});

test('render correct name', () => {
  const { getByText } = renderWithRouterx(<Pokemon pokemon={pokemons[0]} />);
  const name = getByText(/pikachu/i);
  expect(name.innerHTML).toBe('Pikachu');
});

test('render correct weight format', () => {
  const { getByText } = renderWithRouterx(<Pokemon pokemon={pokemons[0]} />);
  const weight = getByText(/Average weight:6.0kg/i);
  expect(weight.innerHTML).toBe('Average weight:6.0kg');
});

test('render correct image', () => {
  const { getByAltText } = renderWithRouterx(<Pokemon pokemon={pokemons[0]} />);
  const image = getByAltText(/pikachu sprite/i);
  expect(image).toBeInTheDocument();
  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(image.alt).toBe('Pikachu sprite');
});

test('render link for pokemonDetail', () => {
  const { getByText, history } = renderWithRouterx(<Pokemon pokemon={pokemons[0]} />);
  const link = getByText(/More details/i);
  expect(link).toBeInTheDocument();
  fireEvent.click(link);
  const pathname = history.location.pathname;
  expect(pathname).toBe('/pokemons/25');
});

test('render star icon for favorite pokemon', () => {
  const { getByAltText } = renderWithRouterx(
    <Pokemon pokemon={pokemons[0]} isFavorite={pokemons[0].id} />,
  );
  const starimage = getByAltText(/pikachu is marked as favorite/i);
  expect(starimage).toBeInTheDocument();
  expect(starimage.src).toBe('http://localhost/star-icon.svg');
  expect(starimage.alt).toBe('Pikachu is marked as favorite');
});
