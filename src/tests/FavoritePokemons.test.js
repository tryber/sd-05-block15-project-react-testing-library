import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

const resetHistory = (pkm = []) => {
  const {
    getByText,
    getAllByRole,
    container,
  } = render(
    <MemoryRouter>
      <FavoritePokemons pokemons={pkm} />
    </MemoryRouter>,
  );
  return { getByText, getAllByRole, container };
};

describe('Routes', () => {
  afterEach(cleanup);

  test('renders no favorites', () => {
    const { container, getByText } = resetHistory();
    const content = getByText(/No favorite pokemon found/i);
    const cards = container.querySelectorAll('.favorite-pokemons');
    expect(content).toBeInTheDocument();
    expect(cards.length).toBe(0);
  });

  test('rendes with favorites', () => {
    const { getByText } = resetHistory([pokemons[3]]);
    const content = getByText(/Average weight:6.9kg/i);
    expect(content).toBeInTheDocument();
  });
});
