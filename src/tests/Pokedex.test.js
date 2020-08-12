import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import App from '../App';
import pokemons from '../data';
// import renderWithRouter from '../components/renderWithRouter';

test('O botão de próximo deve exibir o próximo pokémon da lista', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const button = getByText(/próximo/i);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();
});

test('Teste id', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const id = getAllByTestId(/pokemon-type-button/);
  expect(id.length).toBe(7);
});

test('Próximo Pokemon', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const pokemon = getByText(/Próximo pokémon/i);
  expect(pokemon).toBeInTheDocument();
});

test('Encontrado Pokemon', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const encontrado = getByText(/encountered pokémons/i);
  expect(encontrado).toBeInTheDocument();
});

/* const tipos = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Normal',
  'Dragon',
]; */

test('Tipo Pokemon', () => {
  const { getAllByRole, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const tipoBotao = getAllByRole('button').filter((e) => e.innerHTML !== 'Próximo pokémon');
  const botaoProximo = getByText(/Próximo pokémon/i);
  tipoBotao.forEach((btn) => {
    fireEvent.click(btn);
    let primeiro;
    const selecao = pokemons.filter((pokemon) => {
      if (btn.innerHTML !== 'All') {
        primeiro = pokemons.find((element) => element.type === btn.innerHTML).name;
        return (pokemon.type === btn.innerHTML);
      }
      primeiro = 'Pikachu';
      return true;
    });
    let count = 0;
    selecao.forEach((pokemon) => {
      const pokemonAtual = getByText(pokemon.name);
      expect(pokemonAtual.innerHTML).not.toBe('');
      count += 1;
      fireEvent.click(botaoProximo);
    });
    const pokemonAtual = getByText(selecao[0].name);
    expect(pokemonAtual.innerHTML).toBe(primeiro);
    expect(count).toBe(selecao.length);
  });
});
