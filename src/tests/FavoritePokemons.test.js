import React from 'react';
import { fireEvent, cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemon from '../components/FavoritePokemons';
import App from '../App';

afterEach(cleanup);

describe('testando componente favorite pokemon', () => {
  test('Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FavoritePokemon />
      </MemoryRouter>,
    );
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
  test('A página não deve exibir nenhum card de pokémon não favoritado', () => {
    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText(/more details/i));
    fireEvent.click(getByLabelText(/pokémon favoritado/i));
    fireEvent.click(getByText(/Favorite Pokémons/i));
    expect(getByText(/More details/i)).toBeInTheDocument();
  });
  test('A página deve exibir todos os cards de pokémons favoritados', () => {
    const { getByText, getByLabelText, getAllByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    localStorage.clear();
    fireEvent.click(getByText(/psychic/i));
    fireEvent.click(getByText(/more details/i));
    fireEvent.click(getByLabelText(/pokémon favoritado/i));
    fireEvent.click(getByText(/home/i));
    fireEvent.click(getByText(/dragon/i));
    fireEvent.click(getByText(/more details/i));
    fireEvent.click(getByLabelText(/pokémon favoritado/i));
    fireEvent.click(getByText(/favorite pokémons/i));
    expect(getAllByText(/more details/i).length).toBe(2);
  });
});
