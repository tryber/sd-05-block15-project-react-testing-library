import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import App from '../App';

describe('Deve conter mais informações sobre apenas o pokémon selecionado;', () => {
  test('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const history = createMemoryHistory();
    history.push('/pokemons/25');
    expect(getByText(/pikachu details/i)).toBeInTheDocument();
  });

  test('O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const history = createMemoryHistory();
    history.push('/pokemons/25');
    expect(queryByText(/more details/i)).not.ToBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary;', () => {
    const history = createMemoryHistory();
    history.push('pokemons/25');
    const { getAllByRole } =
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const h2 = getAllByRole('heading')[2];
    expect(h2.tagName).toBe('h2');
    expect(h2.innerHTML).toBe('Summary');
  });

  test('A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado', () => {
    const history = createMemoryHistory();
    history.push('/pokemons/25');
    const { container } = render(
      <MemoryRouter history={history}>
        <App />
      </MemoryRouter>,
    );
    const resumo = container.querySelectorAll('p')[3];
    expect(resumo.innerHTML).toBe(
      'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
    );
  });
});
describe('A página de detalhes deve exibir uma seção com os mapas com as localizações do pokémon', () => {
  test('A seção de detalhes deve conter um heading h2 com o texto Game Locations of <name>, , onde <name> é o nome do pokémon exibido', () => {
    const history = createMemoryHistory();
    history.push('/pokemons/25');
    const { queryByText } = render(
      <MemoryRouter history={history}>
        <App />
      </MemoryRouter>,
    );
    const gameLocation = queryByText(/Game Locations of/);
    expect(gameLocation.innerHTML).toBe('Game Locations of Pikachu');
  });
  test('A seção de detalhes deve exibir todas as localizações do pokémon', () => {
    const history = createMemoryHistory();
    history.push('/pokemons/25');
    const { queryByText } = render(
      <MemoryRouter history={history}>
        <App />
      </MemoryRouter>,
    );
    const pikachu = pokemons[0];
    pikachu.foundAt.forEach((local) => {
      const location = queryByText(local.location);
      expect(location.innerHTML).toBe(local.location);
    });
  });
  test('A imagem da localização deve ter um atributo src com a URL da localização', () => {
    const history = createMemoryHistory();
    history.push('/pokemons/25');
    const { getAllByAltText } = render(
      <MemoryRouter history={history}>
        <App />
      </MemoryRouter>,
    );
    const locationsMap = getAllByAltText(/Pikachu location/);
    expect(locationsMap[0].src).toBe(
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(locationsMap[1].src).toBe(
      'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });
});
test('O label do checkbox deve ser Pokémon favoritado?', () => {
  const history = createMemoryHistory();
  history.push('/pokemons/25');
  const { getByLabelText } = render(
    <MemoryRouter history={history}>
      <App />
    </MemoryRouter>,
  );
      const checkbox = getByLabelText('Pokémon favoritado?');
      expect(checkbox).toBeInTheDocument();
});
