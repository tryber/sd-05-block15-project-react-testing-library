import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../types/renderWithRouter';
import pokemons from '../data';

describe('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  test('O botão deve conter o texto `Próximo pokémon`', () => {
    const { getByText } = renderWithRouter(<App />);
    const textBtn = getByText(/Próximo pokémon/i);
    expect(textBtn).toBeInTheDocument();
    const textPikachu = getByText(/Pikachu/i);
    expect(textPikachu).toBeInTheDocument();
    fireEvent.click(textBtn);
    const textCharmander = getByText(/Charmander/i);
    expect(textCharmander).toBeInTheDocument();
  });

  test('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista', () => {
    const { getByText } = renderWithRouter(<App />);
    const textBtn = getByText(/Próximo pokémon/i);
    expect(textBtn).toBeInTheDocument();
    fireEvent.click(textBtn);
    const textCharmander = getByText(/Charmander/i);
    expect(textCharmander).toBeInTheDocument();
    fireEvent.click(textBtn);
    const textCaterpie = getByText(/Caterpie/i);
    expect(textCaterpie).toBeInTheDocument();
  });

  test('Ao se chegar ao último pokémon da lista, a Pokédex deve voltar para o primeiro pokémon no apertar do botão', () => {
    const { getByText } = renderWithRouter(<App />);
    const textPikachu = getByText(/Pikachu/i);
    expect(textPikachu).toBeInTheDocument();
    pokemons.forEach(() => {
      fireEvent.click(getByText(/Próximo pokémon/i));
    });
    expect(textPikachu).toBeInTheDocument();
  });
});

test('A Pokédex deve exibir apenas um pokémon por vez', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const textName = getAllByTestId(/pokemon-name/i);
  expect(textName.length).toEqual(1);
});

describe('A Pokédex deve exibir apenas um pokémon por vez', () => {
  test('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const typeButton = getAllByTestId(/pokemon-type-button/i);
    expect(typeButton.length).toEqual(7);
  });

  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const { getByText } = renderWithRouter(<App />);
    const textBtnFire = getByText(/Fire/i);
    fireEvent.click(textBtnFire);
    const textCharmander = getByText(/charmander/i);
    expect(textCharmander).toBeInTheDocument();
    const textBtnProximo = getByText(/Próximo Pokémon/i);
    fireEvent.click(textBtnProximo);
    const textRapidash = getByText(/Rapidash/i);
    expect(textRapidash).toBeInTheDocument();
  });

  test('O texto do botão deve ser o nome do tipo, p. ex. `Psychic`', () => {
    const { getByText } = renderWithRouter(<App />);
    const textBtnPsychic = getByText(/Psychic/i);
    const textBtnProximo = getByText(/Próximo pokémon/i);
    expect(textBtnPsychic).toBeInTheDocument();
    fireEvent.click(textBtnPsychic);
    const textAlakazam = getByText(/Alakazam/i);
    expect(textAlakazam).toBeInTheDocument();
    fireEvent.click(textBtnProximo);
    const textMew = getByText(/Mew/i);
    expect(textMew).toBeInTheDocument();
  });
});

describe('A Pokédex deve conter um botão para resetar o filtro', () => {
  test('O texto do botão deve ser `All`', () => {
    const { getByText } = renderWithRouter(<App />);
    const textBtnAll = getByText(/All/i);
    expect(textBtnAll).toBeInTheDocument();
    fireEvent.click(textBtnAll);
    const textPikachu = getByText(/Pikachu/i);
    expect(textPikachu).toBeInTheDocument();
  });

  test('Após clicá-lo, a Pokédex deve voltar a circular por todos os pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const textBtnAll = getByText(/All/i);
    fireEvent.click(textBtnAll);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByText(/Próximo pokémon/i));
    });
  });

  test('teste que não foi avisado', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const procuraH2 = container.querySelector('h2');
    expect(procuraH2).toBeInTheDocument();
    expect(procuraH2.innerHTML).toBe('Encountered pokémons');
  });
});
