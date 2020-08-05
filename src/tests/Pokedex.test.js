import React from 'react';
import { cleanup, render, fireEvent, queryByText } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import { pokemonType } from '../types';


afterEach(cleanup);

test('O botão deve conter o texto Próximo pokémon', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getByText(/próximo pokémon/i)).toBeInTheDocument();
  expect(getByText(/próximo pokémon/i).tagName).toBe('BUTTON');
});

test('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista', () => {
  const { getByText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const pokemonsNames = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];

  for (let i = 0; i < pokemonsNames.length; i += 1) {
    fireEvent.click(getByText(/próximo pokémon/i));
    expect(getByText(pokemonsNames[i])).toBeInTheDocument();
    expect(getAllByText(/Average weight/i)).toHaveLength(1);
  }
})

test('A Pokédex deve conter botões de filtro', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getAllByTestId('pokemon-type-button')).toHaveLength(7);
})

test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const pokemonTypes = ['Eletric', 'Fire', 'Bug', 'Poison', 'Psych'];

  for (let i = 0; i < pokemonTypes.length; i += 1) {
    fireEvent.click(getByText(pokemonType[i]));
    expect(getByTestId('pokemonType')).toBeInTheDocument();
    expect(getByTestId('pokemonType')).toBe(pokemonType[i]);
  }
})

test('', () => {
  const { getByText, getAllByText, getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  // expect(getAllByTestId('pokemon-type-button')).toHaveLength(7);
  
  fireEvent.click(getByText(/Psych/i));
  expect(getByText('Alakazam')).toBeInTheDocument();
  
});

test('A Pokédex deve conter um botão para resetar o filtro', () => {
  const { getByText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getByText(/all/i)).toBeInTheDocument();
  fireEvent.click(getByText(/all/i));
    
  const pokemonsNames = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];

  for (let i = 0; i < pokemonsNames.length; i += 1) {
    fireEvent.click(getByText(/próximo pokémon/i));
    expect(getByText(pokemonsNames[i])).toBeInTheDocument();
    expect(getAllByText(/Average weight/i)).toHaveLength(1);
  }
});

test('O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon', () => {
  const { getByText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText(/Bug/i));
  expect(getByText(/próximo pokémon/i)).toBeDisabled();

});
