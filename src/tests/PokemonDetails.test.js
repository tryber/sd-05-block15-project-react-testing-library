import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

afterEach(cleanup);

test('Deve conter mais informações sobre apenas o pokémon selecionado', () => {
  const { getByText, getAllByText } = render(<MemoryRouter><App /></MemoryRouter>);
  fireEvent.click(getByText(/more details/i));
  expect(getAllByText(/pikachu/i)).toBeDefined();
});

test('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon', () => {
  const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
  fireEvent.click(getByText(/more details/i));
  expect(getByText(/pikachu details/i)).toBeInTheDocument();
});

test('O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon', () => {
  const { getByText, queryByText } = render(<MemoryRouter><App /></MemoryRouter>);
  fireEvent.click(getByText(/more details/i));
  expect(queryByText(/more details/i)).not.toBeInTheDocument();
});

test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
  const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
  fireEvent.click(getByText(/more details/i));
  expect(getByText(/summary/i)).toBeInTheDocument();
  expect(getByText(/summary/i).tagName).toBe('H2');
});

test('A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado', () => {
  const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
  fireEvent.click(getByText(/more details/i));
  expect(getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i)).toBeInTheDocument();
  expect(getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i).tagName).toBe('P');
});

describe('A página de detalhes deve exibir uma seção com os mapas com as localizações do pokémon', () => {
  test('A seção de detalhes deve conter um heading h2 com o texto Game Locations of <name>, , onde <name> é o nome do pokémon exibido', () => {
    const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.click(getByText(/more details/i));
    expect(getByText('Game Locations of Pikachu')).toBeInTheDocument();
    expect(getByText('Game Locations of Pikachu').tagName).toBe('H2');
  });

  test('Cada localização deve exibir o nome da localização e uma imagem do mapa da localização', () => {
    const { getByText, getAllByAltText } = render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.click(getByText(/more details/i));
    expect(getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(getByText('Kanto Power Plant')).toBeInTheDocument();
    expect(getAllByAltText('Pikachu location')).toBeDefined();
    expect(getAllByAltText('Pikachu location').length).toBe(2);
  });

  test('A imagem da localização deve ter um atributo src com a URL da localização', () => {
    const { getByText, getAllByAltText } = render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.click(getByText(/more details/i));
    expect(getAllByAltText('Pikachu location')[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(getAllByAltText('Pikachu location')[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
});

describe('A página de detalhes deve permitir favoritar um pokémon', () => {
  test('A página deve conter um checkbox que permita favoritar um pokémon. Cliques no checkbox devem, alternadadamente, adicionar e remover o pokémon da lista de favoritos', () => {
    const { getByText, getByRole } = render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.click(getByText(/more details/i));
    expect(getByRole('checkbox')).toBeInTheDocument();
    fireEvent.click(getByRole('checkbox'));
    expect(getByRole('checkbox')).toBeChecked();
    fireEvent.click(getByRole('checkbox'));
    expect(getByRole('checkbox')).not.toBeChecked();
  });

  test('O label do checkbox deve ser "Pokémon favoritado?".', () => {
    const { getByText, getByLabelText } = render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.click(getByText(/more details/i));
    expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
    expect(getByLabelText('Pokémon favoritado?').type).toMatch('checkbox');
  });
});
