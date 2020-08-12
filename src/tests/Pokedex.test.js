import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import pokemons from '../data';

test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  // O botão deve conter o texto Próximo pokémon
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const buttonText = getByText(/Próximo/i);
  fireEvent.click(buttonText);
  fireEvent.click(buttonText);
  fireEvent.click(buttonText);
  fireEvent.click(buttonText);
  fireEvent.click(buttonText);
  fireEvent.click(buttonText);
  fireEvent.click(buttonText);
  fireEvent.click(buttonText);
  fireEvent.click(buttonText);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();
});

test('Teste id', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const testeId = getAllByTestId('pokemon-type-button');
  expect(testeId.length).toBe(7);
});

test('Próximo Pokémon', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const proximoPokemon = getByText(/Próximo pokémon/i);
  expect(proximoPokemon).toBeInTheDocument();
});

test('Pokemon Encontrado', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemonEncontrado = getByText(/Encountered pokémon/i);
  expect(pokemonEncontrado).toBeInTheDocument();
});

test('Todos os tipos', () => {
  const { getByText, getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const typesButton = getAllByRole('button').filter((e) => e.innerHTML !== 'Próximo pokémon');
  const nextButton = getByText(/Próximo pokémon/i);
  typesButton.forEach((btn) => {
    fireEvent.click(btn);
    let first;
    const selection = pokemons.filter((pokemon) => {
      if (btn.innerHTML !== 'All') {
        first = pokemons.find((element) => element.type === btn.innerHTML).name;
        return (pokemon.type === btn.innerHTML);
      }
      first = 'Pikachu';
      return true;
    });
    let count = 0;
    selection.forEach((pokemon) => {
      const pokemonAtual = getByText(pokemon.name);
      expect(pokemonAtual.innerHTML).not.toBe('');
      count += 1;
      fireEvent.click(nextButton);
    });
    const pokemonAtual = getByText(selection[0].name);
    expect(pokemonAtual.innerHTML).toBe(first);
    expect(count).toBe(selection.length);
  });
});
