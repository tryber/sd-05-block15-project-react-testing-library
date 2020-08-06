import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

test('Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela', () => {
  const { getByText } = render(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );
  const favPokemon = getByText(/No favorite pokemon found/i);
  expect(favPokemon).toBeInTheDocument();
});
