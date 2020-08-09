import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Pokemons from '../data';
import App from '../App';

const renderWithRouter = (component) => {
  const historyPokedex = createMemoryHistory();
  return {
    ...render(<Router history={historyPokedex}>{component}</Router>), history,
  };
};

describe('Testes Botão próximo', () => {
  afterEach(cleanup);

  test('a página possui um heading Encountered Pokemons', () => {
    const { getByText } = renderWithRouter(<App />);
    const homePage = getByText('Encountered pokémons');
    expect(homePage).toBeInTheDocument();
  });

  test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);

    const nextButton = getByTestId('next-pokemon');
    expect(nextButton.innerHTML).toBe('Próximo pokémon');
    const pokNome = Pokemons.map((pokemon) => pokemon.name);
    pokNome.forEach((pokemonName) => {
      expect(getByText(pokemonName)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });
});

describe('Testes Botão de tipo', () => {
  afterEach(cleanup);

  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);

    const typeButton = getAllByTestId('pokemon-type-button');
    const nextButton = getByTestId('next-pokemon');
    const typeSelected = getByTestId('pokemonType');

    typeButton.forEach((element) => {
      fireEvent.click(element);
      console.log(element);
      const pokType = Pokemons.map((pokemon) => pokemon.name);
      pokType.forEach(() => {
        expect(element.innerHTML).toBe(typeSelected.innerHTML);
        fireEvent.click(nextButton);
      });
    });
  });
});

describe('A Pokédex deve conter um botão para resetar o filtro', () => {
  afterEach(cleanup);

  test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);

    const AllButton = getByText('All');
    fireEvent.click(AllButton);
    const nextButton = getByTestId('next-pokemon');
    const pokeNome = Pokemons.map((pokemon) => pokemon.name);
    pokeNome.forEach((nomeDoPokemon) => {
      expect(getByText(nomeDoPokemon)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });
});

describe('A Pokédex deve gerar, dinamicamente, um botão de filtro para cada tipo de pokémon', () => {
  afterEach(cleanup);

  test('A Pokedex gera os botos de filtro de forma dinamica', () => {
    const { getAllByRole, getAllByTestId } = renderWithRouter(<App />);
    const buttonAll = getAllByRole('button')[0];
    expect(buttonAll).toBeInTheDocument();
    expect(buttonAll.innerHTML).toBe('All');
    const buttonsFilter = getAllByTestId('pokemon-type-button');
    expect(buttonsFilter.length).toBeGreaterThan(0);
    const arrayButtons = buttonsFilter.map((element) => element.innerHTML).sort();
    arrayButtons.forEach((element, index) => {
      const next = index + 1;
      expect(element).not.toBe(arrayButtons[next]);
    });
  });
});
