import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Pokedex from '../components/Pokedex';
import App from '../App';
import pokemons from '../data';

test('A página deve conter um heading h2 com o texto Encountered pokémons', () => {
  const history = createMemoryHistory();
  const { getAllByRole } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const h2 = getAllByRole('heading')[1];
  expect(h2).toBeInTheDocument();
  expect(h2.innerHTML).toBe('Encountered pokémons');
  expect(h2.tagName).toBe('H2');
});

describe('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  test('O botão deve conter o texto Próximo pokémon', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const button = getByText('Próximo pokémon');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  test('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista', () => {
    const history = createMemoryHistory();
    const { getByText, getByTestId } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe(pokemons[0].name);
    const button = getByText('Próximo pokémon');
    fireEvent.click(button);
    expect(pokemonName.innerHTML).toBe(pokemons[1].name);
    fireEvent.click(button);
    expect(pokemonName.innerHTML).toBe(pokemons[2].name);
    fireEvent.click(button);
    expect(pokemonName.innerHTML).toBe(pokemons[3].name);
  });
  test('Ao se chegar ao último pokémon da lista, a Pokédex deve voltar para o primeiro pokémon no apertar do botão', () => {
    const history = createMemoryHistory();
    const smallPokeArray = pokemons.slice(0, 2);
    const favPokemon = { 25: false, 4: true };
    const { getByText, getByTestId } = render(
      <Router history={history}>
        <Pokedex pokemons={smallPokeArray} isPokemonFavoriteById={favPokemon} />
      </Router>,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe(pokemons[0].name);
    const button = getByText('Próximo pokémon');
    fireEvent.click(button);
    expect(pokemonName.innerHTML).toBe(pokemons[1].name);
    fireEvent.click(button);
    expect(pokemonName.innerHTML).toBe(pokemons[0].name);
    fireEvent.click(button);
  });
});

test('A Pokédex deve exibir apenas um pokémon por vez', () => {
  const history = createMemoryHistory();
  const { getAllByTestId } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const pokemonNames = getAllByTestId('pokemon-name');
  expect(pokemonNames.length).toBe(1);
});

describe('A Pokédex deve conter botões de filtro', () => {
  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const history = createMemoryHistory();
    const { getByTestId, getAllByRole, getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const buttons = getAllByRole('button');
    const fireButton = buttons[2];
    fireEvent.click(fireButton);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonName.innerHTML).toBe('Charmander');
    expect(pokemonType.innerHTML).toBe('Fire');
    const nextPokemon = getByText('Próximo pokémon');
    fireEvent.click(nextPokemon);
    expect(pokemonName.innerHTML).toBe('Rapidash');
    expect(pokemonType.innerHTML).toBe('Fire');
    const electricButton = buttons[1];
    fireEvent.click(electricButton);
    expect(pokemonName.innerHTML).toBe('Pikachu');
    expect(pokemonType.innerHTML).toBe('Electric');
  });

  test('O texto do botão deve ser o nome do tipo, p. ex. Psychic', () => {
    const history = createMemoryHistory();
    const { getAllByRole } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const buttons = getAllByRole('button');
    const fireButton = buttons[2];
    expect(fireButton.innerHTML).toBe('Fire');
    const electricButton = buttons[1];
    expect(electricButton.innerHTML).toBe('Electric');
  });
});

describe('A Pokédex deve conter um botão para resetar o filtro', () => {
  test('O texto do botão deve ser All', () => {
    const history = createMemoryHistory();
    const { getAllByRole } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const buttons = getAllByRole('button');
    const resetButton = buttons[0];
    expect(resetButton.innerHTML).toBe('All');
  });

  test('Após clicá-lo, a Pokédex deve voltar a circular por todos os pokémons', () => {
    const history = createMemoryHistory();
    const { getAllByRole, getByTestId, getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const buttons = getAllByRole('button');
    const electricButton = buttons[1];
    fireEvent.click(electricButton);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
    const resetButton = buttons[0];
    fireEvent.click(resetButton);
    const nextPokemon = getByText('Próximo pokémon');
    fireEvent.click(nextPokemon);
    expect(pokemonName.innerHTML).toBe('Charmander');
  });

  test('Quando a página carrega, o filtro selecionado deve ser o All', () => {
    const history = createMemoryHistory();
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
    const nextPokemon = getByText('Próximo pokémon');
    fireEvent.click(nextPokemon);
    expect(pokemonName.innerHTML).toBe('Charmander');
  });
});

test('A Pokédex deve gerar, dinamicamente, um botão de filtro para cada tipo de pokémon', () => {
  const history = createMemoryHistory();
  const { getAllByTestId } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const typesArray = pokemons.map((pokemon) => pokemon.type);
  const buttons = getAllByTestId('pokemon-type-button');
  typesArray.forEach((pokemonType) => {
    expect(buttons.some((button) => button.innerHTML === pokemonType)).toBe(true);
  });
});

test('O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon', () => {
  const history = createMemoryHistory();
  const { getAllByRole, getByText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const buttons = getAllByRole('button');
  const electricButton = buttons[1];
  fireEvent.click(electricButton);
  const nextPokemon = getByText('Próximo pokémon');
  expect(nextPokemon).toBeDisabled();
});
