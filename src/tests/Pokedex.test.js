import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App.js';

afterEach(cleanup);

describe('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getByTestId('next-pokemon')).toBeInTheDocument();
  });

  it('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista, depois voltar ao primeiro', () => {
    const { getByText, getAllByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemons = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];

    // tentar refatorar para forEach
    for (let i = 0; i < pokemons.length; i += 1) {
      fireEvent.click(getByText(/próximo pokémon/i));
      expect(getByText(pokemons[i])).toBeInTheDocument();
      expect(getAllByText(/Average weight/i)).toHaveLength(1);
    }
  });
});

describe('A Pokédex deve conter botões de filtro', () => {
  it('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemonTypeButton = getAllByTestId('pokemon-type-button');

    expect(pokemonTypeButton.length).toBe(7);
  });

  it('O texto do botão deve ser o nome do tipo, p. ex. Psychic', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByText(/Psychic/i));
    expect(getByText(/Alakazam/i)).toBeInTheDocument();
    fireEvent.click(getByText(/próximo pokémon/i));
    fireEvent.click(getByText(/próximo pokémon/i));
    expect(getByText(/Alakazam/i)).toBeInTheDocument();
  });
});
