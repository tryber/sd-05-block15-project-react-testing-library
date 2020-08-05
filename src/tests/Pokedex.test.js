import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

afterEach(cleanup);

test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  const { getByTestId, getByText, getAllByText } = render(<MemoryRouter><App /></MemoryRouter>);
  expect(getByTestId('next-pokemon')).toBeInTheDocument();
  const pokemonsNames = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];
  pokemonsNames.map((pokemon) => {
    fireEvent.click(getByText(/próximo pokémon/i));
    expect(getByText(pokemon)).toBeInTheDocument();
    expect(getAllByText(/average weight/i)).toHaveLength(1);
    return pokemon;
  });
});

test('A Pokédex deve exibir apenas um pokémon por vez', () => {
  const { getAllByText } = render(<MemoryRouter><App /></MemoryRouter>);
  expect(getAllByText(/average weight/i)).toHaveLength(1);
});

describe('A Pokédex deve conter botões de filtro', () => {
  test('O texto do botão deve ser o nome do tipo', () => {
    const { getAllByTestId, getByText, getAllByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getAllByTestId('pokemon-type-button').length).toBe(7);
    fireEvent.click(getByText('Fire'));
    expect(getAllByText('Fire').length).toBe(2);
    expect(getAllByText('Electric').length).toBe(1);
  });
  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.click(getByText(/Psychic/i));
    expect(getByText(/Alakazam/i)).toBeInTheDocument();
    fireEvent.click(getByText(/próximo pokémon/i));
    expect(getByText(/Mew/i)).toBeInTheDocument();
    fireEvent.click(getByText(/próximo pokémon/i));
    expect(getByText(/Alakazam/i)).toBeInTheDocument();
  });
});

describe('A Pokédex deve conter um botão para resetar o filtro', () => {
  test('O texto do botão deve ser "All"', () => {
    const { getAllByRole } = render(<MemoryRouter><App /></MemoryRouter>);
    expect(getAllByRole('button')[0].innerHTML).toMatch('All');
  });

  test('Após clicá-lo, a Pokédex deve voltar a circular por todos os pokémons', () => {
    const { getByText, getAllByText } = render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.click(getByText('Fire'));
    fireEvent.click(getByText('All'));
    const pokemons = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];
    pokemons.forEach((pokemon) => {
      fireEvent.click(getByText(/próximo pokémon/i));
      expect(getByText(pokemon)).toBeInTheDocument();
      expect(getAllByText(/More details/i).length).toBe(1);
    });
  });

  test('Quando a página carrega, o filtro selecionado deve ser o All', () => {
    const { getByText, getAllByText } = render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
    const pokemons = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];
    pokemons.forEach((pokemon) => {
      fireEvent.click(getByText(/próximo pokémon/i));
      expect(getByText(pokemon)).toBeInTheDocument();
      expect(getAllByText(/More details/i).length).toBe(1);
    });
  });
});

test('O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon', () => {
  const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
  fireEvent.click(getByText('Poison'));
  expect(getByText(/próximo pokémon/i)).toBeDisabled();
});
