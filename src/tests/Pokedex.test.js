import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Testes do arquivo Pokedex.js', () => {
  afterEach(cleanup);
  test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const botao = getByText(/Próximo pokémon/);
    expect(botao).toBeInTheDocument();
  });  
  test('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemon = getAllByText(/More details/);
    expect(pokemon.length).toBe(1);
  });
  test('A Pokédex deve conter botões de filtro', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const filtro = getByText(/Psychic/);
    expect(filtro).toBeInTheDocument();
  });
  test('A Pokédex deve conter um botão para resetar o filtro', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const filtro = getByText(/All/);
    expect(filtro).toBeInTheDocument();
  });
});
