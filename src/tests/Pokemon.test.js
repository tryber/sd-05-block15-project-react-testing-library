import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const historyNot = createMemoryHistory();
  return {
    ...render(<Router history={historyNot}>{component}</Router>), history,
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
  });

  test('O peso médio do pokémon deve ser exibido', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const weight = getByTestId(/pokemon-weight/);
    expect(weight).toBeInTheDocument();
  });

  test('A imagem deve conter um atributo src e alt', () => {
    const { getAllByRole } = renderWithRouter(<App />);

    const imagem = getAllByRole(/img/)[0];
    expect(imagem).toBeInTheDocument();
    expect(imagem).toHaveAttribute('src');
    expect(imagem).toHaveAttribute('alt');
  });
});
