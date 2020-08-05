import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Testes do arquivo Pokedex.js', () => {
  afterEach(cleanup);
  test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
    const { getByText, container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(container.querySelector('h2')).toBeInTheDocument();
    expect(getByText('Encountered pokémons')).toBeInTheDocument();

    const botao = getByText(/Próximo pokémon/);
    expect(botao).toBeInTheDocument();

    fireEvent.click(botao);
    expect(getByText('Charmander')).toBeInTheDocument();

    fireEvent.click(botao);
    expect(getByText('Caterpie')).toBeInTheDocument();

    fireEvent.click(botao);
    expect(getByText('Ekans')).toBeInTheDocument();

    fireEvent.click(botao);
    expect(getByText('Alakazam')).toBeInTheDocument();

    fireEvent.click(botao);
    expect(getByText('Mew')).toBeInTheDocument();

    fireEvent.click(botao);
    expect(getByText('Rapidash')).toBeInTheDocument();

    fireEvent.click(botao);
    expect(getByText('Snorlax')).toBeInTheDocument();

    fireEvent.click(botao);
    expect(getByText('Dragonair')).toBeInTheDocument();

    fireEvent.click(botao);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
  test('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemon = getAllByText(/More details/);
    expect(pokemon.length).toBe(1);
  });
  test('A Pokédex deve conter botões de filtro', () => {
    const { getAllByTestId, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const filtro = getAllByTestId(/pokemon-type-button/);
    expect(filtro.length).toBe(7);

    const fireFilter = getByText('Fire');
    fireEvent.click(fireFilter);
    expect(getByText('Charmander')).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/));
    expect(getByText('Rapidash')).toBeInTheDocument();
  });
  test('A Pokédex deve conter um botão para resetar o filtro', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const resetFilter = getByText('All');
    expect(resetFilter).toBeInTheDocument();

    fireEvent.click(resetFilter);
    expect(getByText('Pikachu')).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/));
    expect(getByText('Charmander')).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/));
    expect(getByText('Caterpie')).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/));
    expect(getByText('Ekans')).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/));
    expect(getByText('Alakazam')).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/));
    expect(getByText('Mew')).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/));
    expect(getByText('Rapidash')).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/));
    expect(getByText('Snorlax')).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/));
    expect(getByText('Dragonair')).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/));
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
