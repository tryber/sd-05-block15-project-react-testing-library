import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

afterEach(cleanup);
test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  const { getByTestId, getByText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const btnNext = getByTestId('next-pokemon');
  expect(btnNext).toBeInTheDocument();
  const pokemonsNames = [
    'Charmander',
    'Caterpie',
    'Ekans',
    'Alakazam',
    'Mew',
    'Rapidash',
    'Snorlax',
    'Dragonair',
    'Pikachu',
  ];
  for (let i = 0; i < pokemonsNames.length; i += 1) {
    fireEvent.click(getByText(/próximo pokémon/i));
    expect(getByText(pokemonsNames[i])).toBeInTheDocument();
    expect(getAllByText(/Average weight/i)).toHaveLength(1);
  }
});
test('A Pokédex deve conter botões de filtro', () => {
  const { getAllByTestId, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const btnFilter = getAllByTestId('pokemon-type-button');
  expect(btnFilter.length).toBe(7);
  fireEvent.click(getByText(/Psychic/i));
  expect(getByText(/Alakazam/i)).toBeInTheDocument();
  fireEvent.click(getByText(/próximo pokémon/i));
  fireEvent.click(getByText(/próximo pokémon/i));
  expect(getByText(/Alakazam/i)).toBeInTheDocument();
});
test('A Pokédex deve conter um botão para resetar o filtro', () => {
  const { getByText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const btnAll = getByText('All');
  fireEvent.click(getByText('Fire'));
  fireEvent.click(btnAll);
  const allPokNames = [
    'Charmander',
    'Caterpie',
    'Ekans',
    'Alakazam',
    'Mew',
    'Rapidash',
    'Snorlax',
    'Dragonair',
    'Pikachu',
  ];
  for (let j = 0; j < allPokNames.length; j += 1) {
    fireEvent.click(getByText(/próximo pokémon/i));
    expect(getByText(allPokNames[j])).toBeInTheDocument();
    expect(getAllByText(/More details/i).length).toBe(1);
  }
});
test('O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(getByText('Poison'));
  expect(getByText(/próximo pokémon/i)).toBeDisabled();
});
test('killing the h2 beast', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
});
