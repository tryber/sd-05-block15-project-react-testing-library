import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App.js';

afterEach(cleanup);

describe('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    const { getByText, getAllByText, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemons = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];

    expect(getByTestId('next-pokemon')).toBeInTheDocument();
    // tentar refatorar para forEach
    for (let i = 0; i < pokemons.length; i += 1) {
      fireEvent.click(getByText(/próximo pokémon/i));
      expect(getByText(pokemons[i])).toBeInTheDocument();
      expect(getAllByText(/Average weight/i)).toHaveLength(1);
    }
  });
});
