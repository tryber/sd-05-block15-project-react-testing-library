import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Testes do arquivo Pokedex.js', () => {
  afterEach(cleanup);
  test('5.1 - Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const proximoPokemon = getByText(/Próximo pokémon/i);
    expect(proximoPokemon).toBeInTheDocument();

    let pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    fireEvent.click(proximoPokemon);
    fireEvent.click(proximoPokemon);
    fireEvent.click(proximoPokemon);
    fireEvent.click(proximoPokemon);
    fireEvent.click(proximoPokemon);
    fireEvent.click(proximoPokemon);
    fireEvent.click(proximoPokemon);
    fireEvent.click(proximoPokemon);
    fireEvent.click(proximoPokemon);
    pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const Charmander = queryByText(/Charmander/i);
    expect(Charmander).not.toBeInTheDocument();
  });

  test('A Pokédex deve conter botões de filtro', () => {
    const { getAllByTestId, getByText, getAllByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const testeId = getAllByTestId('pokemon-type-button');
    expect(testeId.length).toBe(7);
    const buttons = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    buttons.map((button) => {
      if (button === 'Electric') {
        return expect(getAllByText(button)[1]).toBeInTheDocument();
      }
      return expect(getByText(button)).toBeInTheDocument();
    });
  });

  test('A Pokédex deve conter um botão para resetar o filtro', () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const buttonAll = getByText(/All/i);
    expect(buttonAll).toBeInTheDocument();
    fireEvent.click(buttonAll);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const nextPokemon = getByTestId(/next-pokemon/i);
    fireEvent.click(nextPokemon);
    const Charmander = getByText(/Charmander/i);
    expect(Charmander).toBeInTheDocument();
    const tituloEncounteredPokemons = getByText(/Encountered pokémons/i);
    expect(tituloEncounteredPokemons).toBeInTheDocument();
  });
});
