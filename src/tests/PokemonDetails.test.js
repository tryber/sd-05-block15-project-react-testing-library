import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

const renderWithRoutero = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>), history,
  };
};

test('page should have information about selected pokemon and should contain title -Pokemon Detail-', () => {
  const { getByText, history } = renderWithRoutero(<App />);
  history.push('/pokemons/25');
  const title = getByText(/pikachu details/i);
  expect(title).toBeInTheDocument();
  expect(title.innerHTML).toBe('Pikachu Details');
});

test('Pokemon should not have link to detail', () => {
  const { queryByText, history } = renderWithRoutero(<App />);
  history.push('/pokemons/25');
  const link = queryByText(/More details/i);
  expect(link).not.toBeInTheDocument();
});

test('Page should have h2', () => {
  const { getByText, history } = renderWithRoutero(<App />);
  history.push('/pokemons/25');
  const summary = getByText(/summary/i);
  expect(summary).toBeInTheDocument();
  expect(summary.innerHTML).toBe(' Summary ');
  expect(summary.tagName).toBe('H2');
});

test('Page should have paragraph with summary', () => {
  const { getByText, history } = renderWithRoutero(<App />);
  history.push('/pokemons/25');
  const resumo = getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i);
  expect(resumo).toBeInTheDocument();
});

test('Page should have h2 of game location', () => {
  const { getByText, history } = renderWithRoutero(<App />);
  history.push('/pokemons/25');
  const h2 = getByText(/Game Locations of Pikachu/i);
  expect(h2).toBeInTheDocument();
  expect(h2.innerHTML).toBe('Game Locations of Pikachu');
  expect(h2.tagName).toBe('H2');
});

test('Page should have location,', () => {
  const { getAllByAltText, getByText, history } = renderWithRoutero(<App />);
  history.push('/pokemons/25');
  const location1 = getByText(/Kanto Viridian Forest/i);
  const location2 = getByText(/Kanto Power Plant/i);
  expect(location1).toBeInTheDocument();
  expect(location2).toBeInTheDocument();
  const images = getAllByAltText(/pikachu location/i);
  expect(images[0]).toBeInTheDocument();
  expect(images[1]).toBeInTheDocument();
  expect(images[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(images[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
});

test('Page should have location,', () => {
  const { getByLabelText, history } = renderWithRoutero(<App />);
  history.push('/pokemons/25');
  const checkbox = getByLabelText('Pokémon favoritado?');
  expect(checkbox).toBeInTheDocument();
});
