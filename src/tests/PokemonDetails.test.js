// testing-library.com/docs/example-react-router
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

test('Pokemons Details', () => {
  const history = createMemoryHistory();
  history.push('/pokemons/25');
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const nome = getByText(/pikachu details/i);
  expect(nome).toBeInTheDocument();
  expect(nome.innerHTML).toBe('Pikachu Details');
});

test('h2, summary, paragrafo, game location', () => {
  const history = createMemoryHistory();
  history.push('/pokemons/25');
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const summary = getByText(/summary/i);
  expect(summary).toBeInTheDocument();
  expect(summary.innerHTML).toBe(' Summary ');
  expect(summary.tagName).toBe('H2');

  const paragrafo = getByText(
    /This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i
  );
  expect(paragrafo).toBeInTheDocument();

  const game = getByText(/Game Locations of Pikachu/i);
  expect(game).toBeInTheDocument();
  expect(game.innerHTML).toBe('Game Locations of Pikachu');
  expect(game.tagName).toBe('H2');
});

test('Location', () => {
  const history = createMemoryHistory();
  history.push('/pokemons/25');
  const { getAllByAltText, getByText, getByLabelText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const location = getByText(/Kanto Viridian Forest/i);
  expect(location).toBeInTheDocument();

  const locationPower = getByText(/Kanto Power Plant/i);
  expect(locationPower).toBeInTheDocument();

  const imagem = getAllByAltText(/pikachu location/i);
  expect(imagem[0]).toBeInTheDocument();
  expect(imagem[1]).toBeInTheDocument();
  expect(imagem[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(imagem[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

  const check = getByLabelText('Pokémon favoritado?');
  expect(check).toBeInTheDocument();
});
