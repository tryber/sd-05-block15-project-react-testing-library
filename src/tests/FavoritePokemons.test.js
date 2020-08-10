import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import FavouritePokemons from '../components/FavoritePokemons';
import data from '../data';

describe('Testando o arquivo Favorite Pokémons', () => {
  it('Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela.', () => {
    const { getByText } = render(<FavouritePokemons pokemons={[]} />);
    const noFavoritePokemons = getByText(/No favorite pokemon found/i);
    expect(noFavoritePokemons).toBeInTheDocument();
  });

  it('A pagina não deve exibir nenhum card de pokémon não favoritado.', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <FavouritePokemons pokemons={[data[0]]} />
      </MemoryRouter>,
    );
    const pokesToNotFind = data.slice(3, 6);
    pokesToNotFind.forEach(({ name }) => {
      const pokemon = queryByText(name);
      expect(pokemon).not.toBeInTheDocument();
    });
  });

  it('A página deve exibir todos os cards de pokémons favoritados', () => {
    const pokesToFind = data.slice(0, 5);
    const { queryByText } = render(
      <MemoryRouter>
        <FavouritePokemons pokemons={pokesToFind} />
      </MemoryRouter>,
    );
    pokesToFind.forEach(({ name }) => {
      const favoritePoke = queryByText(name);
      expect(favoritePoke).toBeInTheDocument();
    });
  });
});
