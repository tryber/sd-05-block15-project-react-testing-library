import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testes do arquivo FavoritePokemons.js', () => {
  afterEach(cleanup);
  test('3.1 - Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );
    const verificandoMensagem = getByText(/No favorite pokemon found/i);
    expect(verificandoMensagem).toBeInTheDocument();
  });

  test('3.2 - A página não deve exibir nenhum card de pokémon não favoritado', () => {
    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText(/more details/i));
    fireEvent.click(getByLabelText(/pokémon favoritado/i));
  });

  test('3.3 - A página deve exibir todos os cards de pokémons favoritados', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByText(/bug/i));
    fireEvent.click(getByText(/more details/i));
  });
});
