import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, render, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

describe('Deve conter mais informações sobre apenas o pokémon que foi selecionado', () => {
  test('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon ', () => {
    const history = createMemoryHistory();
    history.push('/pokemons/25');
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    expect(getByText(/Pikachu details/i)).toBeInTheDocument();
  });
});

test('O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon ', () => {
  const history = createMemoryHistory();
  history.push('/pokemons/25');
  const { queryByText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  expect(queryByText(/More details/i)).not.toBeInTheDocument();
});

test('A seção de detalhes deve conter um heading h2 com o texto', () => {
  const history = createMemoryHistory();
  history.push('/pokemons/25');
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  expect(getByText(/Summary/i).tagName).toBe('H2');
});
test('A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado', () => {
  const history = createMemoryHistory();
  history.push('/pokemons/25');
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  expect(
    getByText(
      /'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat'./i,
    ),
  ).toBe('p');
});

describe('A página de detalhes deve exibir uma seção com os mapas com as localizações do pokémon', () => {
  test('A seção de detalhes deve conter um heading h2 com o texto Game Locations of <name>, onde <name> é o nome do pokémon exibido ', () => {
    const history = createMemoryHistory();
    history.push('pokemons/25');
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    expect(getByText(/Game locations of Pikachu/i).tagName).toBe('H2');
  });
});
describe('A imagem da localização deve ter um atributo src com a URL da localização. Cada localização deve exibir o nome da localização e uma imagem do mapa da localização. A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do pokémon', () => {
  test('A imagem da localização deve ter um atributo src com a URL da localização ', () => {
    const history = createMemoryHistory();
    history.push('/pokemons/25');
    const { getAllByAltText, getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const localizarMap = getAllByAltText(/pikachu location/);
    expect(getByText(/Kanto Viridian Forest/i)).toBeInTheDocument();
    expect(localizarMap[0].src).toHaveAttribute('src');
    expect(localizarMap[0].src).toBe(
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(getByText(/Kanto Power Plant/i)).toBeInTheDocument();
    expect(localizarMap[1]).toHaveAttribute('src');
    expect(localizarMap[1].src).toBe(
      'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });
});
describe('O label do checkbox deve ser: Pokémon favoritado?', () => {
  test('A página de detalhes deve conter um checkbox que permita favoritar um pokémon. Cliques no checkbox devem, alternadadamente, adicionar e remover o pokémon da lista de favoritos ', () => {
    const history = createMemoryHistory();
    history.push('/pokemons/25');
    const { getByLabelText, getByAltText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    expect(getByLabelText(/Pokémon favoritado?/i)).toBeEnabled();
    fireEvent.click(getByLabelText(/Pokémon favoritado?/i));
    expect(getByAltText(/Pikachu is marked as favorite/i)).toBeInTheDocument();
    expect(getByLabelText(/Pokémon favoritado?/i)).toBeChecked();
    expect(getByLabelText(/Pokémon favoritado?/i).checked).toBeTruthy();
  });
});
