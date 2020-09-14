import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);
test('Deve conter mais informações sobre apenas o pokémon selecionado;', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(getByText('More details'));
  expect(getByText('Pikachu Details')).toBeInTheDocument();
  expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
  expect(getByText(/summary/i)).toBeInTheDocument();
  expect(
    getByText(
      'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
    ),
  ).toBeInTheDocument();
});

test('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/pikachu/i)).toBeInTheDocument();
  fireEvent.click(getByText('More details'));
  expect(getByText('Pikachu Details')).toBeInTheDocument();
});

test('O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon', () => {
  const { getByText, queryByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/pikachu/i)).toBeInTheDocument();
  fireEvent.click(getByText('More details'));
  expect(getByText('Pikachu Details')).toBeInTheDocument();
  expect(queryByText('More details')).not.toBeInTheDocument();
});
// whenever testing if item IS NOT IN DOCUMENT, use Query instead of Get

test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/pikachu/i)).toBeInTheDocument();
  fireEvent.click(getByText('More details'));
  expect(getByText('Pikachu Details')).toBeInTheDocument();
  expect(getByText(/summary/i)).toBeInTheDocument();
  expect(getByText(/summary/i).tagName).toBe('H2');
});

test('A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(getByText('More details'));
  expect(getByText('Pikachu Details')).toBeInTheDocument();
  expect(getByText(/summary/i)).toBeInTheDocument();
  expect(
    getByText(
      'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
    ),
  ).toBeInTheDocument();
});

describe('A página de detalhes deve exibir uma seção com os mapas com as localizações do pokémon', () => {
  test('A seção de detalhes deve conter um heading h2 com o texto Game Locations of <name>, , onde <name> é o nome do pokémon exibido', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText('More details'));
    expect(getByText('Summary')).toBeInTheDocument();
    expect(getByText('Game Locations of Pikachu')).toBeInTheDocument();
    expect(getByText('Game Locations of Pikachu').tagName).toBe('H2');
  });
  test('A seção de detalhes deve exibir todas as localizações do pokémon', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText('More details'));
    expect(getByText('Game Locations of Pikachu')).toBeInTheDocument();
    expect(getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(getByText('Kanto Power Plant')).toBeInTheDocument();
  });

  test('Cada localização deve exibir o nome da localização e uma imagem do mapa da localização', () => {
    const { getByText, getAllByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText('More details'));
    const location = getAllByAltText(/Pikachu location/i);
    expect(location[0]).toBeInTheDocument();
    expect(location[1]).toBeInTheDocument();
    expect(getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(getByText('Kanto Power Plant')).toBeInTheDocument();
  });

  test('A imagem da localização deve ter um atributo src com a URL da localização', () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText('More details'));
    const image = getAllByRole('img');
    expect(image[1].src).toBe(
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(image[2].src).toBe(
      'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });
  test('A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do pokémon.', () => {
    const { getByText, getAllByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText('More details'));
    const location = getAllByAltText(/Pikachu location/i);
    expect(location[0]).toBeInTheDocument();
    expect(location[1]).toBeInTheDocument();
  });
});

describe('A página de detalhes deve permitir favoritar um pokémon', () => {
  test('A página deve conter um checkbox que permita favoritar um pokémon. Cliques no checkbox devem, alternadadamente, adicionar e remover o pokémon da lista de favoritos', () => {
    const { getByText, getByTestId, getByRole, getByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText('More details'));
    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
    expect(getByRole('checkbox').checked).toBe(false);
    fireEvent.click(getByRole('checkbox'));
    expect(getByRole('checkbox').checked).toBe(true);
    expect(getByAltText(/Pikachu is marked as favorite/i)).toBeInTheDocument();
  });

  test('', () => {
    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText('More details'));
    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
  });
});
