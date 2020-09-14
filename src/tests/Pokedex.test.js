import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);
describe('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  test('O botão deve conter o texto Próximo pokémon', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
    // Adicionado pra cobrir 100% do test coverage
    expect(getByText('Próximo pokémon')).toBeInTheDocument();
  });

  test('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText(/pikachu/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/charmander/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/caterpie/i));
  });

  test('Ao se chegar ao último pokémon da lista, a Pokédex deve voltar para o primeiro pokémon no apertar do botão.', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText(/pikachu/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/charmander/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/caterpie/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/ekans/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/alakazam/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/mew/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/rapidash/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/snorlax/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/dragonair/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });
});

test('A Pokédex deve exibir apenas um pokémon por vez', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getAllByTestId(/pokemon-name/).length).toBe(1);
});

describe('A Pokédex deve conter botões de filtro', () => {
  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const { getByTestId, getAllByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const buttonTypes = getAllByTestId('pokemon-type-button');
    const pokemonType = getByTestId('pokemonType');
    expect(buttonTypes.length).toBe(7);
    buttonTypes.forEach((type) => {
      fireEvent.click(type);
      expect(pokemonType.textContent).toBe(type.textContent);
    });
  });

  test('A Pokédex deve conter um botão para resetar o filtro', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText(/All/i));
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/charmander/i)).toBeInTheDocument();
  });

  test('Quando a página carrega, o filtro selecionado deve ser o All.', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByTestId('pokemon-name').innerHTML).toBe('Charmander');
  });

  test('O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon', () => {
    const { getAllByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const buttons = getAllByRole('button');
    const electricButton = buttons[1];
    fireEvent.click(electricButton);
    const nextPokemon = getByText('Próximo pokémon');
    expect(nextPokemon).toBeDisabled();
  });
});
