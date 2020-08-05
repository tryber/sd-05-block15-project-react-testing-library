import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Deve ser retornado um card com as informações de determinado pokémon', () => {
  test('O nome correto do pokémon deve aparecer na tela', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <Pokemon pokemon={pokemons[0]} isFavorite={false} />
      </Router>,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
  });

  test('O tipo correto do pokémon deve aparecer na tela', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <Pokemon pokemon={pokemons[0]} isFavorite={false} />
      </Router>,
    );
    const pokemonName = getByTestId('pokemonType');
    expect(pokemonName.innerHTML).toBe('Electric');
  });

  test('O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value>', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <Pokemon pokemon={pokemons[0]} isFavorite={false} />
      </Router>,
    );
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight.innerHTML).toBe('Average weight:6.0kg');
  });

  test('A imagem deve conter um atributo src com a URL da imagem do pokémon. A imagem deverá ter também um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon', () => {
    const history = createMemoryHistory();
    const { getByAltText } = render(
      <Router history={history}>
        <Pokemon pokemon={pokemons[0]} isFavorite={false} />
      </Router>,
    );
    const image = getByAltText('Pikachu sprite');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('O pokémon exibido na Pokédex deve conter um link de navegação para exibir detalhes deste pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Pokemon pokemon={pokemons[0]} isFavorite={false} />
      </Router>,
    );
    const link = getByText('More details');
    expect(link.href).toMatch(/\/pokemons\/25/);
  });

  test('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
    const history = createMemoryHistory();
    const { getByAltText } = render(
      <Router history={history}>
        <Pokemon pokemon={pokemons[0]} isFavorite />
      </Router>,
    );
    const img = getByAltText('Pikachu is marked as favorite');
    expect(img).toBeInTheDocument();
    expect(img.src).toMatch(/\/star-icon.svg/);
  });
});
