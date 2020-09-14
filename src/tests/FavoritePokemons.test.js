import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
import App from '../App';

afterEach(cleanup);

describe('FavoritePokemon Test', () => {
  test('Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela.', () => {
    const { getByText } = render(<FavoritePokemons pokemons={[]} />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  test('A página não deve exibir nenhum card de pokémon não favoritado.', () => {
    const { queryByText } = render(<FavoritePokemons pokemons={[]} />);
    expect(queryByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  test('A página não deve exibir nenhum card de pokémon não favoritados', () => {
    const { getByText, queryAllByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText(/favorite pokémons/i));
    expect(queryAllByAltText(/is marked as favorite/i).length).toBe(0);
  });

  test('A página deve exibir todos os cards de pokémons favoritados', () => {
    const { getByText, getAllByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText(/more details/i));
    fireEvent.click(getByText(/pokémon favoritado?/i));
    fireEvent.click(getByText(/favorite pokémons/i));
    expect(getAllByAltText(/is marked as favorite/i).length).toBe(1);
  });
});
