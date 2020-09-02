import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import { createMemoryHistory } from 'history';

import App from '../App';
import Data from '../data';

test('PokemonDetails page test', () => {
  const favoritoPokemon = Data.find(Boolean);
  const history = createMemoryHistory();
  history.push(`/pokemons/${favoritoPokemon.id}`);
  const { queryByText, getByText, queryByLabelText, queryAllByRole, findByText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );

  const pokemonName = getByText(`${favoritoPokemon.name} Details`);
  expect(pokemonName).toBeInTheDocument();

  const heading = findByText(/Summary/);
  expect(heading).toBeInTheDocument();
  expect(heading.tagName).toBe('H2');

  const summaryParagraph = heading.nextElementSibling;
  expect(summaryParagraph).toBeInTheDocument();
  expect(summaryParagraph.tagName).toBe('P');

  const localInfo = getByText(`Game Locations of ${favoritoPokemon.name}`);
  expect(localInfo).toBeInTheDocument();
  expect(localInfo.tagName).toBe('H2');

  const locations = favoritoPokemon.foundAt;
  locations.forEach(({ location, map }) => {
    const lugar = queryByText(location);
    expect(lugar).toBeInTheDocument();
    const { alt, src } = lugar.parentElement.previousElementSibling;
    expect(alt).toBe(`${favoritoPokemon.name} location`);
    expect(src).toBe(map);
  });

  const favoritado = queryByLabelText('Pokémon favoritado?');
  expect(favoritado).toBeInTheDocument();
  fireEvent.click(favoritado);
  const estrelinha = queryAllByRole('img')
    .find((imgSrc) => imgSrc.src.endsWith('star-icon.svg'));
  expect(estrelinha).toBeInTheDocument();
  fireEvent.click(favoritado);
  expect(estrelinha).not.toBeInTheDocument();
});
