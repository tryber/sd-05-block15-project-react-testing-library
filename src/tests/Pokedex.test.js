import React from 'react';
import { fireEvent, render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App.js';

afterEach(cleanup);

describe('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  test('O botão deve conter o texto do Próximo pokémon ', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });
});

describe('A Pokédex deve conter botões de filtro ', () => {
  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo ', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const btnType = getAllByTestId('pokemon-type-button');
    expect(btnType.length).toBe(7);
  });

  test('cliques sucessivos no botão devem mostrar o próximo pokémon da lista ', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokes = [
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
    for (let i = 0; i < pokes.length; i += 1) {
      fireEvent.click(getByText(/próximo pokémon/i));
      expect(getByText(pokes[i])).toBeInTheDocument();
    }
  });

  test('O texto do botão deve ser o nome do tipo, p. ex. Psychic ', () => {
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

  test('O texto do botão deve ser All ', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('All')).toBeInTheDocument();
  });

  test('Após clicá-lo, a Pokédex deve voltar a circular por todos os pokémons ', () => {
    const { getByText, getAllByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokes = [
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
    for (let i = 0; i < pokes.length; i += 1) {
      fireEvent.click(getByText(/próximo pokémon/i));
      expect(getByText(pokes[i])).toBeInTheDocument();
      expect(getAllByText(/More details/i).length).toBe(1);
    }
  });

  test('O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(getByText('Bug'));
    expect(getByText(/próximo pokémon/i)).toBeDisabled();
  });
});
