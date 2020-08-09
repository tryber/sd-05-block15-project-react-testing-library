import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

afterEach(cleanup);

describe('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  test('O botão deve conter o texto Próximo pokémon', () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
    expect(getByTestId('next-pokemon')).toBeInTheDocument();
  });

  test('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista, depois voltar ao primeiro', () => {
    const { getByText, getAllByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemons = [
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu',
    ];
    for (let i = 0; i < pokemons.length; i += 1) {
      fireEvent.click(getByText(/próximo pokémon/i));
      expect(getByText(pokemons[i])).toBeInTheDocument();
      expect(getAllByText(/Average weight/i)).toHaveLength(1);
    }
  });
});

describe('A Pokédex deve conter botões de filtro', () => {
  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemonTypeButton = getAllByTestId('pokemon-type-button');
    expect(pokemonTypeButton.length).toBe(7);
  });

  test('O texto do botão deve ser o nome do tipo, p. ex. Psychic', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText(/Psychic/i));
    expect(getByText(/Alakazam/i)).toBeInTheDocument();
    fireEvent.click(getByText(/próximo pokémon/i));
    fireEvent.click(getByText(/próximo pokémon/i));
    expect(getByText(/Alakazam/i)).toBeInTheDocument();
  });
});

describe('A Pokédex deve conter um botão para resetar o filtro', () => {
  test('O texto do botão deve ser All', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('All')).toBeInTheDocument();
  });

  test('Após clicá-lo, a Pokédex deve voltar a circular por todos os pokémons', () => {
    const { getByText, getAllByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemons = [
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu',
    ];
    fireEvent.click(getByText('Fire'));
    fireEvent.click(getByText('All'));
    for (let i = 0; i < pokemons.length; i += 1) {
      fireEvent.click(getByText(/próximo pokémon/i));
      expect(getByText(pokemons[i])).toBeInTheDocument();
      expect(getAllByText(/More details/i).length).toBe(1);
    }
  });

  test('O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText('Poison'));
    expect(getByText(/próximo pokémon/i)).toBeDisabled();
  });
});
