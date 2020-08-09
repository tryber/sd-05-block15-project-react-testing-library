import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup } from '@testing-library/react';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const renderWithRouter = (component) => {
  const historyPokemon = createMemoryHistory();
  return {
    ...render(<Router history={historyPokemon}>{component}</Router>), history,
  };
};

describe('Deve ser retornado um card com as informações de determinado pokémon', () => {
  afterEach(cleanup);

  test('a página possui um heading Encountered Pokemons', () => {
    const { getByText } = renderWithRouter(<App />);
    const paginaRender = getByText('Encountered pokémons');
    expect(paginaRender).toBeInTheDocument();
  });

  test('O nome correto do pokémon deve aparecer na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const nome = getByTestId(/pokemon-name/);
    expect(nome).toBeInTheDocument();
    expect(nome.innerHTML).toMatch('Pikachu');
  });

  test('O tipo do pokémon deve aparecer na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const nome = getByTestId(/pokemonType/);
    expect(nome).toBeInTheDocument();
    expect(nome.innerHTML).toMatch('Electric');
  });

  test('O peso médio do pokémon deve ser exibido', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const weight = getByTestId(/pokemon-weight/);
    expect(weight).toBeInTheDocument();
    expect(weight.innerHTML).toMatch('Average weight:6.0kg');
  });

  test('A imagem deve conter um atributo src e alt', () => {
    const { getAllByRole } = renderWithRouter(<App />);

    const imagem = getAllByRole(/img/)[0];
    expect(imagem).toBeInTheDocument();
    expect(imagem).toHaveAttribute('src');
    expect(imagem.src).toMatch('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imagem).toHaveAttribute('alt');
    expect(imagem.alt).toMatch('sprite');
  });

  test('link para mais detalhes', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const detalhesButton = getAllByRole('link')[3];
    console.log(detalhesButton);
    expect(detalhesButton).toBeInTheDocument();
    expect(detalhesButton.href).toMatch('/pokemons/25');
  });

  test('pokemons favoritos possuem marcação', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon pokemon={pokemons[0]} isFavorite />,
    );
    const imgagemFavorito = getAllByRole('img')[1];
    expect(imgagemFavorito.src).toMatch(/\/star-icon.svg/);
    expect(imgagemFavorito.alt).toMatch('Pikachu is marked as favorite');
  });
});
