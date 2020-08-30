import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderRoute from '../services/render';

test('should render a Card of Pokémon', () => {
  const {
    queryByText,
    queryAllByRole,
    getAllByAltText,
    getByLabelText,
    getByText,
    history,
    container,
  } = renderRoute(<App />);
  fireEvent.click(getByText(/More details/i));
  const moreDetails = (queryByText(/More details/i));
  const mapOfPokemon = (getByText(/Game Locations of Pikachu/i));
  const p = container.querySelectorAll('p')[3];
  const summaryHeading = queryAllByRole('heading')[2];
  const pathName = history.location.pathname;
  const pokemonName = getByText(/Pikachu Details/i);
  const labelText = getByLabelText(/Pokémon favoritado?/i);
  const mapImg1 = getAllByAltText(/Pikachu Location/i)[0];
  const mapImg2 = getAllByAltText(/Pikachu Location/i)[1];

  expect(pathName).toBe('/pokemons/25');
  expect(pokemonName).toBeInTheDocument();
  expect(moreDetails).toBeNull();
  expect(p).toHaveTextContent('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
  expect(p).toBeInTheDocument();
  expect(summaryHeading).toHaveTextContent('Summary');
  expect(mapOfPokemon).toBeInTheDocument();
  expect(labelText).toBeInTheDocument();
  expect(mapImg1).toBeInTheDocument();
  expect(mapImg2).toBeInTheDocument();
  expect(mapImg1.src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(mapImg2.src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
});
