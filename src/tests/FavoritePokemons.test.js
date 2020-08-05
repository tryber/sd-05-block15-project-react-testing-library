import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

test('Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela.', () => {
  const { getByText } = render(<FavoritePokemons pokemons={[]} />);
  const sentence = getByText(/no favorite pokemon found/i);
  expect(sentence).toBeInTheDocument();
});

test('A página não deve exibir nenhum card de pokémon não favoritado.', () => {
  const { queryAllByText, queryByText } = render(
    <MemoryRouter>
      <FavoritePokemons pokemons={pokemons.slice(0, 5)} />
    </MemoryRouter>,
  );
  const dragonair = queryByText('Dragonair');
  expect(dragonair).not.toBeInTheDocument();
  const snorlax = queryByText('Snorlax');
  expect(snorlax).not.toBeInTheDocument();
  const favPokemons = queryAllByText('More details');
  expect(favPokemons.length).toBe(5);
});

test('A página deve exibir todos os cards de pokémons favoritados', () => {
  const { queryAllByText, queryByText } = render(
    <MemoryRouter>
      <FavoritePokemons pokemons={pokemons.slice(0, 2)} />
    </MemoryRouter>,
  );
  const pikachu = queryByText('Pikachu');
  expect(pikachu).toBeInTheDocument();
  const charmander = queryByText('Charmander');
  expect(charmander).toBeInTheDocument();
  const favPokemons = queryAllByText('More details');
  expect(favPokemons.length).toBe(2);
});
