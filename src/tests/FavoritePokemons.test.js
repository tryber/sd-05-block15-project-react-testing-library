import React from 'react';
import { render } from '@testing-library/react';
import Fav from '../components/FavoritePokemons';

// 3. Testes do arquivo FavoritePokemons.js
// Caso a pessoa não tenha pokémons favoritos,
// a mensagem No favorite pokemon found deve aparecer na tela.

// A página não deve exibir nenhum card de pokémon não favoritado.

// A página deve exibir todos os cards de pokémons favoritados;
describe('Teste FavoritesPokémons', () => {
  test('Teste caso não tenha pokemons', () => {
    const { getByText } = render(<Fav />);
    const favEmpty = getByText(/No favorite pokemon found/i);
    expect(favEmpty).toBeInTheDocument();
  });
});
