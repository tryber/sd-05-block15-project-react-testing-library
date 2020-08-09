import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste do arquivo PokemonDetails', () => {
  afterEach(cleanup);

  test('Deve conter mais informações sobre apenas o pokémon selecionado', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const name = getByText(/pikachu details/i);
    expect(name).toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { getByText, queryAllByRole } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const h2 = queryAllByRole('heading')[2];
    expect(h2).toHaveTextContent('Summary');
  });

  test('A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado', () => {
    const { container, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const p = container.querySelectorAll('p')[3];
    expect(p).toHaveTextContent('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
  });

  test('A página de detalhes deve exibir uma seção com os mapas com as localizações do pokémon', () => {
    const { container, getByText, getAllByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const h2 = (getByText(/game locations of pikachu/i));
    expect(h2).toBeInTheDocument();
    const map1 = getAllByAltText(/Pikachu Location/i)[0];
    expect(map1).toBeInTheDocument();
    expect(map1.src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    const p1 = container.querySelectorAll('p')[4];
    expect(p1).toBeInTheDocument();
    expect(p1).toHaveTextContent('Kanto Viridian Forest');
    const map2 = getAllByAltText(/Pikachu Location/i)[1];
    expect(map2).toBeInTheDocument();
    expect(map2.src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    const p2 = container.querySelectorAll('p')[5];
    expect(p2).toBeInTheDocument();
    expect(p2).toHaveTextContent('Kanto Power Plant');
  });

  test('A página de detalhes deve permitir favoritar um pokémon', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const labelText = getByLabelText(/Pokémon favoritado?/i);
    expect(labelText).toBeInTheDocument();
  });
});
