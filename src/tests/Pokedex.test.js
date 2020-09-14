// Explicação do Mitchel e codando junto com o Sid
// Explicação do Luca Castro
import React from 'react';
import { fireEvent, render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App.js';

afterEach(cleanup);

test('Próximo pokémon ', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
});

test('Pokédex deve circular', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const botaoTipo = getAllByTestId('pokemon-type-button');
  expect(botaoTipo.length).toBe(7);
});

test('Próximo pokémon da lista ', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const todosPokemons = [
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
  for (let i = 0; i < todosPokemons.length; i += 1) {
    fireEvent.click(getByText(/próximo pokémon/i));
    expect(getByText(todosPokemons[i])).toBeInTheDocument();
  }
});

test('Texto do botão', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(getByText(/Psychic/i));
  expect(getByText(/Alakazam/i)).toBeInTheDocument();
  fireEvent.click(getByText(/próximo pokémon/i));
  fireEvent.click(getByText(/próximo pokémon/i));
  expect(getByText(/Alakazam/i)).toBeInTheDocument();
});

test('O texto do botão All ', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('All')).toBeInTheDocument();
});

test('Pokédex deve voltar a circular', () => {
  const { getByText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const todosPokemons = [
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
  fireEvent.click(getByText('Fire'));
  fireEvent.click(getByText('All'));
  for (let i = 0; i < todosPokemons.length; i += 1) {
    fireEvent.click(getByText(/próximo pokémon/i));
    expect(getByText(todosPokemons[i])).toBeInTheDocument();
    expect(getAllByText(/More details/i).length).toBe(1);
  }
});

test('O botão próximo desabilitado', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText('Bug'));
  expect(getByText(/próximo pokémon/i)).toBeDisabled();
});
