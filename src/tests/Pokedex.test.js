import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
import App from '../App';
import Data from '../data';

afterEach(cleanup);

describe('testes componente pokedex', () => {
  test('O botão deve conter o texto Próximo pokémon', () => {
    const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
    const btn = getByText(/próximo pokémon/i);
    expect(btn).toBeInTheDocument();
  });
  test('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista', () => {
    const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
    const btn = getByText(/próximo pokémon/i);
    Data.forEach((element) => {
      expect(getByText(element.name)).toBeInTheDocument();
      fireEvent.click(btn);
    });
  });
  test('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { getAllByText, getByText } = render(<MemoryRouter><App /></MemoryRouter>);
    const btn = getByText(/próximo pokémon/i);
    expect(getAllByText(/average weight/i).length).toBe(1);
    fireEvent.click(btn);
    expect(getAllByText(/average weight/i).length).toBe(1);
  });
  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const { getByText, getAllByText } = render(<MemoryRouter><App /></MemoryRouter>);
    const btnFire = getByText('Fire');
    const btnPsychic = getByText('Psychic');
    fireEvent.click(btnFire);
    expect(getAllByText(/fire/i).length).toBe(2);
    fireEvent.click(btnPsychic);
    expect(getAllByText(/psychic/i).length).toBe(2);
  });
  test('A Pokédex deve conter um botão para resetar o filtro', () => {
    const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
    const btn = getByText(/próximo pokémon/i);
    const btnAll = getByText(/all/i);
    expect(btnAll).toBeInTheDocument();
    fireEvent.click(btnAll);
    Data.forEach((element) => {
      expect(getByText(element.name)).toBeInTheDocument();
      fireEvent.click(btn);
    });
  });
  test('A Pokédex deve gerar, dinamicamente, um botão de filtro para cada tipo de pokémon', () => {
    const { container } = render(<MemoryRouter><App /></MemoryRouter>);
    const types = Data.map((element) => element.type);
    const result = types.filter((elem, index, self) => index === self.indexOf(elem));
    result.forEach((element) => {
      expect(container.innerHTML.includes(element));
    });
  });
  test('O botão de próximo pokémon deve ser desabilitado se a lista de pokémons filtrados tiver um só pokémon', () => {
    const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
    const btn = getByText(/próximo pokémon/i);
    const array = ['Bug', 'Poison', 'Normal', 'Dragon'];
    array.forEach((element) => {
      fireEvent.click(getByText(element));
      expect(btn).toBeDisabled();
    });
  });
});
