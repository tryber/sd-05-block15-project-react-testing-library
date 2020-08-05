import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

/* function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
} */

describe('teste do componente Pokedex', () => {
  afterEach(cleanup);

  test('botao de próximo chega no primeiro pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const pokemon = getByTestId('pokemon-name');
    const firstName = pokemon.innerHTML;
    const buttonNext = getByTestId('next-pokemon');
    expect(buttonNext).toBeInTheDocument();
    fireEvent.click(buttonNext);
    do {
      fireEvent.click(buttonNext);
    } while (pokemon.innerHTML !== firstName);
    expect(pokemon.innerHTML).toBe(firstName);
  });

  test('pokedex exibe um pokemon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  test('pokedex contém botoes de filtro que funcionam', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const buttonsFilter = getAllByTestId('pokemon-type-button');
    buttonsFilter.forEach((element) => {
      fireEvent.click(element);
      const pokemonName = getByTestId('pokemon-name');
      const firstPokemon = pokemonName.innerHTML;
      const pokemonType = getByTestId('pokemonType');
      const firstType = pokemonType.innerHTML;
      const buttonNext = getByTestId('next-pokemon');
      expect(element.innerHTML).toBe(firstType);
      do {
        fireEvent.click(buttonNext);
        expect(pokemonType.innerHTML).toBe(firstType);
      } while (firstPokemon !== pokemonName.innerHTML);
    });
  });

  test('O botão All reseta o filtro', () => {
    const { getAllByRole, getByTestId } = renderWithRouter(<App />);
    const buttonAll = getAllByRole('button')[0];
    expect(buttonAll.innerHTML).toBe('All');
    fireEvent.click(buttonAll);
    const buttonNext = getByTestId('next-pokemon');
    const pokemonType = getByTestId('pokemonType');
    const firstType = pokemonType.innerHTML;
    do {
      fireEvent.click(buttonNext);
    } while (pokemonType.innerHTML === firstType);
    expect(pokemonType.innerHTML).not.toBe(firstType);
  });

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

  test('Botão next é desabilitado caso só tenha um pokemon', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const buttonEletric = getAllByTestId('pokemon-type-button')[0];
    fireEvent.click(buttonEletric);
    const buttonNext = getByTestId('next-pokemon');
    expect(buttonNext.disabled).toBe(true);
  });
});
