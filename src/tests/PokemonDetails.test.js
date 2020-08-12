import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import pokemons from '../data';

test('page contains info only about the selected pokemon', () => {
  const { getByText, queryByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText('Poison'));
  fireEvent.click(getByText('More details'));

  expect(queryByText('Caterpie Details')).not.toBeInTheDocument();
});

test('page contains the text <name> Details, where name refers to the pokemon', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  const name = getByTestId('pokemon-name').innerHTML;
  fireEvent.click(getByText('More details'));

  expect(getByText(`${name} Details`)).toBeInTheDocument();
});

test('doesnt show a link to "more details"', () => {
  const { getByText, queryByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText('More details'));

  expect(queryByText('More details')).not.toBeInTheDocument();
});

test('shows a summary heading"', () => {
  const { getByText, getAllByRole } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText('More details'));

  expect(getAllByRole('heading')[2].tagName).toBe('H2');
  expect(getAllByRole('heading')[2]).toHaveTextContent('Summary');
});

test('shows a paragraph with the pokemon details"', () => {
  const pokemonId = 25;

  const { getByText } = render(
    <MemoryRouter initialEntries={[`/pokemons/${pokemonId}`]}>
      <App />
    </MemoryRouter>,
  );

  const selectedPokemon = pokemons.find((pokemon) => pokemon.id === pokemonId);
  const { summary } = selectedPokemon;

  expect(getByText(summary)).toBeInTheDocument();
});


test('shows a maps section', () => {
  const { getByText, getByTestId, getAllByRole, getAllByAltText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  const name = getByTestId('pokemon-name').innerHTML;
  const selectedPokemon = pokemons.find((pokemon) => pokemon.name === name);
  const { foundAt } = selectedPokemon;

  fireEvent.click(getByText('More details'));

  expect(getAllByRole('heading')[3].tagName).toBe('H2');
  expect(getAllByRole('heading')[3]).toHaveTextContent(`Game Locations of ${name}`);
  expect(getAllByAltText(`${name} location`)[0]).toHaveProperty('src', `${foundAt[0].map}`);
});

test('allows the user to favorite a pokemon', () => {
  const { getByText, getByLabelText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText('More details'));
  const favCheckbox = getByLabelText('Pokémon favoritado?');
  expect(favCheckbox).toHaveProperty('type', 'checkbox');
});
