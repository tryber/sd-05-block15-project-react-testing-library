import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Pokemon } from '../components';
import pokemons from '../data';

const resetHistory = (pkm = pokemons[0], isFavorite = false) => {
  const {
    getByText,
    container,
    getByRole,
    getAllByText,
    getAllByTestId,
  } = render(
    <MemoryRouter>
      <Pokemon isFavorite={isFavorite} pokemon={pkm} />
    </MemoryRouter>,
  );
  return { getByText, container, getByRole, getAllByText, getAllByTestId };
};

const getRandomPkmIndex = () => Math.floor(Math.random() * pokemons.length);

describe('Testing pokémon card', () => {
  afterEach(cleanup);
  let pkmIndex = getRandomPkmIndex();

  test('Card informations', () => {
    const { name } = pokemons[pkmIndex];
    const { getByText } = resetHistory(pokemons[pkmIndex]);

    const myPkm = getByText(name);
    expect(myPkm).toBeInTheDocument();
  });

  test('Testing avarage weight format', () => {
    pkmIndex = getRandomPkmIndex();
    const { averageWeight } = pokemons[pkmIndex];
    const { getByText } = resetHistory(pokemons[pkmIndex]);

    const infoFormat = `Average weight:${averageWeight.value}${averageWeight.measurementUnit}`;
    const myPkm = getByText(infoFormat);
    expect(myPkm).toBeInTheDocument();
  });

  test('Testing image', () => {
    pkmIndex = getRandomPkmIndex();
    const { image, name } = pokemons[pkmIndex];
    const { container } = resetHistory(pokemons[pkmIndex]);
    const myPkm = container.querySelector('img');

    expect(myPkm).toBeInTheDocument();
    expect(myPkm.src).toBe(image);
    expect(myPkm.alt).toBe(`${name} sprite`);
  });

  test('Testing link', () => {
    pkmIndex = getRandomPkmIndex();
    const { id, name } = pokemons[pkmIndex];
    const { container, getByText } = resetHistory(pokemons[pkmIndex]);
    const link = container.querySelector('a');

    expect(link).toBeInTheDocument();
    expect(link.href.includes(`/pokemons/${id}`)).toBe(true);

    fireEvent.click(link);

    const title = getByText(`${name}`);
    expect(title).toBeInTheDocument();
  });

  test('Test favorites', () => {
    pkmIndex = getRandomPkmIndex();
    const { name } = pokemons[pkmIndex];
    const { container } = resetHistory(pokemons[pkmIndex], true);
    const star = container.querySelector('.favorite-icon');

    expect(star).toBeInTheDocument();
    expect(star.alt).toBe(`${name} is marked as favorite`);
  });
});
