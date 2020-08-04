import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import App from '../App.js';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  const { getByTestId, getByText, getAllByText } = render(<MemoryRouter><App /></MemoryRouter>);
  // botao
  const btnNext = getByTestId('next-pokemon');
  expect(btnNext).toBeInTheDocument();
  // cliques sucessivos, volta no começo, mostra apenas um
  const pokemonsNames = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];
  for (let i = 0; i < pokemonsNames.length; i += 1) {
    fireEvent.click(getByText(/próximo pokémon/i));
    expect(getByText(pokemonsNames[i])).toBeInTheDocument();
    expect(getAllByText(/Average weight/i)).toHaveLength(1);
  }
});

test('A Pokédex deve exibir apenas um pokémon por vez', () => {
  const { getAllByTestId, getByText } = render(<MemoryRouter><App /></MemoryRouter>);
  // botao de filtro
  const btnFilter = getAllByTestId('pokemon-type-button');
  expect(btnFilter.length).toBe(7);
  // cliques sucessivos com filtro, exemplo de um tipo
  fireEvent.click(getByText(/Psychic/i));
  expect(getByText(/Alakazam/i)).toBeInTheDocument();
});