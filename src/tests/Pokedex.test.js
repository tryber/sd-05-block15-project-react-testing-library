import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

afterEach(cleanup);

describe('Testes do arquivo Pokedex.js', () => {
  test('O botão deve conter o texto Próximo pokémon', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getByText(/próximo pokémon/i)).toBeInTheDocument();
    expect(getByText(/próximo pokémon/i).tagName).toBe('BUTTON');
  });

  test('Página home deve ter o texto "Encountered pokémons"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getByText(/encountered pokémons/i)).toBeInTheDocument();
  });

  test('A Pokédex deve conter botões de filtro', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getAllByTestId('pokemon-type-button')).toHaveLength(7);
  });

  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const { getByText, getByTestId, getAllByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const pokemonTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    fireEvent.click(getAllByText(pokemonTypes[0])[1]);
    expect(getByTestId('pokemonType')).toBeInTheDocument();
    expect(getByTestId('pokemonType').innerHTML).toBe(pokemonTypes[0]);

    for (let i = 1; i < pokemonTypes.length; i += 1) {
      fireEvent.click(getByText(pokemonTypes[i]));
      expect(getByTestId('pokemonType')).toBeInTheDocument();
      expect(getByTestId('pokemonType').innerHTML).toBe(pokemonTypes[i]);
    }
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
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByText(/Bug/i));
    expect(getByText(/próximo pokémon/i)).toBeDisabled();
  });
});
