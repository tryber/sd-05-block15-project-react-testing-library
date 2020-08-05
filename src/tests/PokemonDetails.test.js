import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { PokemonDetails } from '../components';
import pokemons from '../data';

const resetHistory = (id = 0, favList = []) => {
  const {
    getByText,
    queryByText,
    container,
    getByAltText,
    getByLabelText,
  } = render(
    <MemoryRouter>
      <PokemonDetails
        pokemons={pokemons}
        isPokemonFavoriteById={{ [id]: false }}
        match={{params: { id: id.toString() }}}
        onUpdateFavoritePokemons={(pid, isFav) => { favList.push({ pid, isFav }); }}
      />
    </MemoryRouter>,
  );
  return { getByText, container, getByAltText, queryByText, getByLabelText };
};

const getRandomPkmIndex = () => Math.floor(Math.random() * pokemons.length);

describe('Testing pokémon detail', () => {
  afterEach(cleanup);
  let pkmIndex = getRandomPkmIndex();

  test('Details exists', () => {
    const { id, name, summary } = pokemons[pkmIndex];
    const { getByText, queryByText } = resetHistory(id);
    const myPkm = getByText(summary);
    const nameDetails = getByText(name);
    const link = queryByText(/More details/i);

    expect(myPkm).toBeInTheDocument();
    expect(nameDetails).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
  });

  test('Check Summary', () => {
    pkmIndex = getRandomPkmIndex();
    const { id } = pokemons[pkmIndex];
    const { container } = resetHistory(id);
    const h2 = container.querySelectorAll('h2')[1];

    expect(h2).toBeInTheDocument();
    expect(h2.innerHTML.includes('Summary')).toBe(true);
  });

  test('Check Maps', () => {
    pkmIndex = getRandomPkmIndex();
    const { id, name, foundAt } = pokemons[pkmIndex];
    const { container, getByText, getByAltText } = resetHistory(id);
    const h2 = container.querySelectorAll('h2')[2];

    expect(h2).toBeInTheDocument();
    expect(h2.innerHTML).toBe(`Game Locations of ${name}`);

    foundAt.forEach(({ location, map }) => {
      const loc = getByText(location);
      const img = getByAltText(`${name} location`);
      expect(loc).toBeInTheDocument();
      expect(img).toBeInTheDocument();
      expect(img.getAttribute('src')).toBe(map);
    });
  });

  test('Set favorite', () => {
    pkmIndex = getRandomPkmIndex();
    const favList = [];
    const { id } = pokemons[pkmIndex];
    const { getByLabelText } = resetHistory(id, favList);
    const checkButton = getByLabelText(/Pokémon favoritado?/i);

    expect(checkButton).toBeInTheDocument();
    expect(favList.length).toBe(0);
  });
});
