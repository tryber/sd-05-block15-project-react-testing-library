import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
import pokemons from '../data';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>), history,
  };
};

test('it should show the next pokemon with click on next-pokemon button', () => {
  const { getByText } = renderWithRouter(<App />);
  const pokemonsName = pokemons.map((poke) => poke.name);

  const nextButton = getByText('Próximo pokémon');

  pokemonsName.forEach((poke) => {
    expect(getByText(poke)).toBeInTheDocument();
    fireEvent.click(nextButton);
  });
});

test('it should contain filter buttons and works for each filter', () => {
  const { getAllByTestId, getByText } = renderWithRouter(<App />);
  // const filterButton = container.getElementsByClassName('filter-button');
  // expect(filterButton.length).toBe(8);

  const filterButtons = getAllByTestId('pokemon-type-button');
  expect(filterButtons.length).toBe(7);
  const nextPokemon = getByText('Próximo pokémon');
  filterButtons.forEach((filter) => {
    if (filter.innerHTML === ('Eletric' || 'Bug' || 'Poison' || 'Normal' || 'Dragon')) {
      expect(nextPokemon).toBeDisabled();
    }
    if (filter.innerHTML === 'Fire') {
      fireEvent.click(filter);
      expect(getByText('Charmander')).toBeInTheDocument();
      fireEvent.click(nextPokemon);
      expect(getByText('Rapidash')).toBeInTheDocument();
      fireEvent.click(nextPokemon);
      expect(getByText('Charmander')).toBeInTheDocument();
    }
    if (filter.innerHTML === 'Psychic') {
      fireEvent.click(filter);
      expect(getByText('Alakazam')).toBeInTheDocument();
      fireEvent.click(nextPokemon);
      expect(getByText('Mew')).toBeInTheDocument();
      fireEvent.click(nextPokemon);
      expect(getByText('Alakazam')).toBeInTheDocument();
    }
  });
});

test('it should have a all button to reset the filter', () => {
  const { getByText } = renderWithRouter(<App />);
  const allButton = getByText('All');
  expect(allButton).toBeInTheDocument();
  expect(getByText('Pikachu')).toBeInTheDocument();
  const nextButton = getByText('Próximo pokémon');
  fireEvent.click(nextButton);
  expect(getByText('Charmander')).toBeInTheDocument();
});

test('it should create filter buttons dynamic', () => {
  const { getAllByTestId, getByText } = renderWithRouter(<App />);
  const pokemonsButtons = getAllByTestId('pokemon-type-button');
  pokemonsButtons.forEach((butt, index) => {
    const pokemonsTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const allButton = getByText('All');
    expect(butt).toBeInTheDocument();
    expect(butt.innerHTML).toBe(pokemonsTypes[index]);
    expect(allButton).toBeInTheDocument();
  });
});
