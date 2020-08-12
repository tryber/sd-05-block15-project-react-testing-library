import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

describe('Testes do arquivo Pokedex', () => {
  afterEach(cleanup);

  test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);
    let i = 0;
    while (i < data.length) {
      fireEvent.click(getByText(/Próximo pokémon/i));
      const pokemon = queryByText(
        i !== data.length - 1 ? data[i + 1].name : data[0].name,
      );
      expect(pokemon).toBeInTheDocument();
      if (i !== data.length) {
        i += 1;
      } else {
        i = 0;
      }
    }
  });

  test('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  test('A Pokédex deve conter botões de filtro e h2', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);
    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
  test('pokemons por tipo', () => {
    const {
      getAllByRole,
      getByTestId,
      getByText,
      getAllByTestId,
      queryByText,
    } = renderWithRouter(
      <App />,
    );
    const buttons = getAllByRole('button');
    const next = buttons.pop();
    const all = buttons.shift();
    const type = getAllByTestId('pokemon-type-button');
    type.map((label) => {
      fireEvent.click(label);
      expect(getByTestId('pokemonType').innerHTML).toBe(label.innerHTML);
      return null;
    });
    expect(getByText('All')).toBeInTheDocument();
    fireEvent.click(all);
    const pokemon = queryByText(data[0].name);
    expect(pokemon).toBeInTheDocument();
    const array = [0, 2, 3, 5, 6];
    array.map((index) => {
      fireEvent.click(type[index]);
      expect(next.disabled).toBe(true);
      return null;
    });
  });
});
