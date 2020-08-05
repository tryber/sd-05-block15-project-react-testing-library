import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

test('should render a Card of Pokémon', () => {
  const { queryByText, getByText, history, container } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More details/i));
  const moreDetails = (queryByText(/More details/i));
  const mapOfPokemon = (getByText(/Game Locations of Pikachu/i));
  const p = container.querySelector('p');
  const summary = (queryByText(/Summary/i));
  const pathName = history.location.pathname;
  const pokemonName = getByText(/Pikachu Details/i);
  expect(pathName).toBe('/pokemons/25');
  expect(pokemonName).toBeInTheDocument();
  expect(moreDetails).toBeNull();
  expect(summary).toBeInTheDocument();
  expect(p).toBeInTheDocument();
  expect(mapOfPokemon).toBeInTheDocument();
});
