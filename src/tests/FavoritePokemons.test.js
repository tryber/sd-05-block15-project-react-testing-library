import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testes do arquivo FavoritePokemons.js', () => {
  afterEach(cleanup);
  test('Mensagem caso nao tenha pokémons favoritados', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    const msg = getByText(/No favorite pokemon found/);
    expect(msg).toBeInTheDocument();
  });

  test('A página deve exibir todos os cards de pokémons favoritados', () => {
    const { getByText, getByLabelText, getAllByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByText(/bug/i));
    fireEvent.click(getByText(/more details/i));
    fireEvent.click(getByLabelText(/pokémon favoritado/i));
    fireEvent.click(getByText(/home/i));
    fireEvent.click(getByText(/fire/i));
    fireEvent.click(getByText(/more details/i));
    fireEvent.click(getByLabelText(/pokémon favoritado/i));
    fireEvent.click(getByText(/Favorite Pokémons/i));
    expect(getAllByText(/More details/i).length).toBe(2);
  });
});
