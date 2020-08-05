import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

test('should render a Card of Pokémon', () => {
  const {
    queryByText,
    getByLabelText,
    queryAllByRole,
    getByText,
    getAllByAltText,
    history,
    container,
  } = renderWithRouter(<App />);

  fireEvent.click(getByText(/More details/i));
  const moreDetails = queryByText(/More details/i);
  const mapOfPokemon = getByText(/Game Locations of Pikachu/i);
  const p = container.querySelectorAll('p')[3];
  const summaryHeading = queryAllByRole('heading')[2];
  const pathName = history.location.pathname;
  const pokemonName = getByText(/Pikachu Details/i);
  const label = getByLabelText(/pokémon favoritado?/i);
  const map1 = getAllByAltText(/pikachu location/i)[0];
  const map2 = getAllByAltText(/pikachu location/i)[1];

  expect(pathName).toBe('/pokemons/25');
  expect(pokemonName).toBeInTheDocument();
  expect(moreDetails).toBeNull();
  expect(p).toBeInTheDocument();
  expect(p).toHaveTextContent(
    'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  );
  expect(summaryHeading).toHaveTextContent('Summary');
  expect(mapOfPokemon).toBeInTheDocument();
  expect(label).toBeInTheDocument();
  expect(map1).toBeInTheDocument();
  expect(map2).toBeInTheDocument();
  expect(map1.src).toBe(
    'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
  );
});
