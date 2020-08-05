import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  test('O botão deve conter o texto `Próximo pokémon`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Próximo pokémon')).toBeInTheDocument();
  });
  test('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista / Ao se chegar ao último pokémon da lista, a Pokédex deve voltar para o primeiro pokémon no apertar do botão.', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Charmander')).toBeInTheDocument();
  });
  test('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { queryAllByText } = renderWithRouter(<App />);
    expect(queryAllByText(/More details/i).length).toEqual(1);
  });
  test('A Pokédex deve conter botões de filtro', () => {
    const { getAllByText, getAllByTestId } = renderWithRouter(<App />);
    pokemons.forEach( ({ type }) => expect(getAllByText(type)[0]).toBeInTheDocument());
    expect(getAllByTestId('pokemon-type-button').length).toEqual(7);
  });
  test('A Pokédex deve conter um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/All/i)).toBeInTheDocument();
    fireEvent.click(getByText(/All/i));
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
  test('Deve have um h2 com texto "Encountered pokémons"', () => {
    const { container } = renderWithRouter(<App />);
    expect(container.querySelector('h2')).toBeInTheDocument();
    expect(container.querySelector('h2').innerHTML).toBe('Encountered pokémons');
  })
});
