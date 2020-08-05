import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

test('should render a Card of Pokémon', () => {
  const { queryByText, getByRole, getByText, history, container } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More details/i));
  const moreDetails = (queryByText(/More details/i));
  const mapOfPokemon = (getByText(/Game Locations of Pikachu/i));
  const p = container.querySelector('p');
  const h2 = container.querySelectorAll('h2')[1];
  const pathName = history.location.pathname;
  const pokemonName = getByText(/Pikachu Details/i);
  expect(pathName).toBe('/pokemons/25');
  expect(pokemonName).toBeInTheDocument();
  expect(moreDetails).toBeNull();
  expect(h2).toHaveTextContent('Summary');
  expect(p).toBeInTheDocument();
  expect(mapOfPokemon).toBeInTheDocument();
});
