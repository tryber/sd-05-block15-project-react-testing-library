import React from 'react';
import { MemoryRouter } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import { cleanup, render, fireEvent } from '@testing-library/react';
// import Pokédex from '../components/Pokedex';
import App from '../App';
import pokemons from '../data';


afterEach(cleanup);

test('testing the the Próximo pokémon button', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const NextBtn = getByText('Próximo pokémon');
  expect(NextBtn).toBeInTheDocument();
  expect(NextBtn.tagName).toBe('BUTTON');

  // const BtnId = getByTestId('next-pokemon');
  // expect(BtnId).toBeInTheDocument();
  // expect(queryByRole('')).toBeInTheDocument();
});

test('Next pokemons clicking from home', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName.innerHTML).toBe(pokemons[0].name);
  const NextBtn = getByText('Próximo pokémon');
  fireEvent.click(NextBtn);
  expect(pokemonName.innerHTML).toBe(pokemons[1].name);
  fireEvent.click(NextBtn);
  expect(pokemonName.innerHTML).toBe(pokemons[2].name);
});

test('Next pokemons clicking looping', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName.innerHTML).toBe(pokemons[0].name);
  fireEvent.click(getByText('Fire'));
  expect(pokemonName.innerHTML).toBe('Charmander');
  const NextBtn = getByText('Próximo pokémon');
  fireEvent.click(NextBtn);
  expect(pokemonName.innerHTML).toBe('Rapidash');
  fireEvent.click(NextBtn);
  expect(pokemonName.innerHTML).toBe('Charmander');
});

test('Only one pokemon at a time', () => {
  const { getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const One = getAllByText(/More details/i);
  expect(One.length).toBe(1);
});

test('Filter buttons', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemonType = getByTestId('pokemonType');
  expect(pokemonType.innerHTML).toBe(pokemons[0].type);
  fireEvent.click(getByText('Fire'));
  expect(pokemonType.innerHTML).toBe('Fire');
  const NextBtn = getByText('Próximo pokémon');
  fireEvent.click(NextBtn);
  expect(pokemonType.innerHTML).toBe('Fire');
  fireEvent.click(getByText('Bug'));
  expect(pokemonType.innerHTML).toBe('Bug');
  fireEvent.click(getByText('Electric'));
  expect(pokemonType.innerHTML).toBe('Electric');
});

test('There should be one "reset" filter button called "All" that resets the filter', () => {
  const { getAllByText, getAllByRole, getByTestId, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const One = getAllByText(/All/i);
  expect(One.length).toBe(1);
  const buttons = getAllByRole('button');
  const AllButton = buttons[0];
  expect(AllButton.innerHTML).toBe('All');

  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName.innerHTML).toBe(pokemons[0].name);
  const NextBtn = getByText('Próximo pokémon');
  fireEvent.click(NextBtn);
  expect(pokemonName.innerHTML).toBe('Charmander');
  fireEvent.click(getByText('Bug'));
  expect(pokemonName.innerHTML).toBe('Caterpie');
  fireEvent.click(getByText('All'));
  expect(pokemonName.innerHTML).toBe('Pikachu');
  fireEvent.click(NextBtn);
  expect(pokemonName.innerHTML).toBe('Charmander');
  fireEvent.click(NextBtn);
  expect(pokemonName.innerHTML).toBe('Caterpie');
});

test('if there is only one Poke of a type the Próximo button should be disabled', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(getByText('Bug'));
  expect(getByText(/próximo pokémon/i)).toBeDisabled();
});

test('there should be a filter button for every type os pokemon', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  localStorage.clear();
  const typesListArray = pokemons.map((pokemon) => pokemon.type);
  const FilterBtns = getAllByTestId('pokemon-type-button');
  expect(FilterBtns.length).toBe(7);
  typesListArray.forEach((pokemonType) => {
    expect(FilterBtns.some((button) => button.innerHTML === pokemonType)).toBe(true);
  });
});

test('H2 heading with Encountered pokémons', () => {
  const { getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const Title = getAllByRole('heading')[1];
  expect(Title).toBeInTheDocument();
  expect(Title.innerHTML).toBe('Encountered pokémons');
  expect(Title.tagName).toBe('H2');
});
