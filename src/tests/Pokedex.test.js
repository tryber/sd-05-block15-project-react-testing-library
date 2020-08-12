import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

test('A página deve exibir o próximo pokémon da lista', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />;
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
  const Pikachu = getByText(/Pikachu/i);
  expect(Pikachu).toBeInTheDocument();
});

test('Teste ID', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const testId = getAllByTestId('pokemon-type-button');
  expect(testId.length).toBe(7);
});

test('Proximo Pokemon', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />;
    </MemoryRouter>,
  );
  const proximoPokemon = getByText(/Próximo pokémon/i);
  expect(proximoPokemon).toBeInTheDocument();
});

test('Encontrado Pokemon', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />;
    </MemoryRouter>,
  );
  const encontradoPokemon = getByText(/Encountered pokémons/i);
  expect(encontradoPokemon).toBeInTheDocument();
});

test('Typo', () => {
  const { getAllByRole, getByText } = render(
    <MemoryRouter>
      <App />;
    </MemoryRouter>,
  );
  const tipoBotao = getAllByRole('button').filter((e) => (e.innerHTML !== 'Próximo pokémon'));
  const botaoProximo = getByText('Próximo pokémon');
  tipoBotao.forEach((btn) => {
    fireEvent.click(btn);
    let primeiro;
    const selecao = pokemons.filter((pokemon) => {
      if (btn.innerHTML !== 'All') {
        primeiro = pokemons.find((poke) => poke.type === btn.innerHTML).name;
        return pokemon.type === btn.innerHTML;
      }
      primeiro = 'Pikachu';
      return true;
    });
    let count = 0;
    selecao.forEach(
      (pokemon) => {
        const pokemonAtual = getByText(pokemon.name);
        expect(pokemonAtual.innerHTML).not.toBe('');
        count += 1;
        fireEvent.click(botaoProximo);
      },
    );
    const pokemonAtual = getByText(selecao[0].name);
    expect(pokemonAtual.innerHTML).toBe(primeiro);
    expect(count).toBe(selecao.length);
  });
});
