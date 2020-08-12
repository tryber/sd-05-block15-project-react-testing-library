import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';

function renderWithRouter(
  ui,
  { route = '/',
  history = createMemoryHistory({ initialEntries: [route] }) } = {},
  ) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('Teste da página Pokedex', () => {
  afterEach(cleanup);
  test('Teste do botão next ', () => {
    const { getByText } = renderWithRouter(<App />);
    let checkPokemon = getByText(/Pikachu/i);
    const btnText = getByText(/Próximo pokémon/i);
    expect(btnText).toBeInTheDocument();
    expect(checkPokemon).toBeInTheDocument();
    fireEvent.click(btnText);
    checkPokemon = getByText(/Charmander/i);
    expect(checkPokemon).toBeInTheDocument();
    fireEvent.click(btnText);
    checkPokemon = getByText(/Caterpie/i);
    expect(checkPokemon).toBeInTheDocument();
    fireEvent.click(btnText);
    checkPokemon = getByText(/Ekans/i);
    expect(checkPokemon).toBeInTheDocument();
    fireEvent.click(btnText);
    checkPokemon = getByText(/Alakazam/i);
    expect(checkPokemon).toBeInTheDocument();
    fireEvent.click(btnText);
    checkPokemon = getByText(/Mew/i);
    expect(checkPokemon).toBeInTheDocument();
    fireEvent.click(btnText);
    checkPokemon = getByText(/Rapidash/i);
    expect(checkPokemon).toBeInTheDocument();
    fireEvent.click(btnText);
    checkPokemon = getByText(/Snorlax/i);
    expect(checkPokemon).toBeInTheDocument();
    fireEvent.click(btnText);
    checkPokemon = getByText(/Dragonair/i);
    expect(checkPokemon).toBeInTheDocument();
    fireEvent.click(btnText);
    checkPokemon = getByText(/Pikachu/i);
    expect(checkPokemon).toBeInTheDocument();
  });
  test('Teste do botão reset filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const resetBtnText = getByText(/All/i);
    fireEvent.click(resetBtnText);
    const isReseted = getByText(/Pikachu/i);
    expect(isReseted).toBeInTheDocument();
  });
  test('Teste o número de botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const numberOfFilters = getAllByTestId(/pokemon-type-button/);
    expect(numberOfFilters.length).toBe(7);
  });
  test('Teste dos botões de filtro', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    let filterName = getAllByText(/Electric/i);
    // console.log(filterName)
    let pokeName = getByText(/Pikachu/i);
    fireEvent.click(filterName[1]);
    expect(pokeName).toBeInTheDocument();
    filterName = getAllByText(/Fire/i);
    fireEvent.click(filterName[0]);
    pokeName = getByText(/Charmander/i);
    expect(pokeName).toBeInTheDocument();
    filterName = getAllByText(/Bug/i);
    fireEvent.click(filterName[0]);
    pokeName = getByText(/Caterpie/i);
    expect(pokeName).toBeInTheDocument();
    filterName = getAllByText(/Poison/i);
    fireEvent.click(filterName[0]);
    pokeName = getByText(/Ekans/i);
    expect(pokeName).toBeInTheDocument();
    filterName = getAllByText(/Psychic/i);
    fireEvent.click(filterName[0]);
    pokeName = getByText(/Alakazam/i);
    expect(pokeName).toBeInTheDocument();
    filterName = getAllByText(/Normal/i);
    fireEvent.click(filterName[0]);
    pokeName = getByText(/Snorlax/i);
    expect(pokeName).toBeInTheDocument();
    filterName = getAllByText(/Dragon/i);
    fireEvent.click(filterName[0]);
    pokeName = getByText(/Dragonair/i);
    expect(pokeName).toBeInTheDocument();
  });
  test('Teste h2 com o título ', () => {
    const { getByText } = renderWithRouter(<App />);
    const h2Text = getByText(/Encountered pokémons/i);
    expect(h2Text).toBeInTheDocument();
  });
});
