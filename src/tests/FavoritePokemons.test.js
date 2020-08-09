import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';


afterEach(cleanup);

describe('Verificação do funcionamento da página Favorite Pokemons', () => {
  test('Se a pessoa não tiver pokemons favoritos, exibe No favorite pokemon found deve aparecer na tela', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  test('Página não deve mostrar nenhum card de pokemon não favoritado', () => {
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
