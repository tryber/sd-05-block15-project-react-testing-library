import React from 'react';
import { Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import App from '../App';
import Data from '../data';

test('Botoes em pokedex funcionamento', () => {
  const history = createMemoryHistory();

  const { queryByText, getByText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );

  const nextPokemon = queryByText('Próximo pokémon');
  expect(nextPokemon.tagName).toBe('BUTTON');
  expect(nextPokemon).toBeInTheDocument();
  fireEvent.click(nextPokemon);
  const newPokemon = getByText('Charmander');
  expect(newPokemon).toBeInTheDocument();
  const ultimoPokemon = Data[Data.length - 1];
  expect(ultimoPokemon.name).toBe('Dragonair');
  fireEvent.click(nextPokemon);
  const firstPokemon = Data[0];
  expect(firstPokemon.name).toBe('Pikachu');
  const allPokemons = queryByText('All');
  expect(allPokemons).toBeInTheDocument();
  expect(allPokemons.tagName).toBe('BUTTON');
});
