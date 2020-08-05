import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

afterEach(cleanup);

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>), history,
  };
};

describe('Deve conter mais informações sobre apenas o pokémon selecionado', () => {
  test('O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon', () => {
    const { queryByText, history } = renderWithRouter(<App />);

    history.push('/pokemons/25');

    expect(queryByText(/pikachu details/i)).toBeInTheDocument();
    expect(queryByText(/more details/i)).not.toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { queryByText, history } = renderWithRouter(<App />);

    history.push('/pokemons/25');

    expect(queryByText(/Summary/i).tagName).toEqual('H2');
  });

  test('A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado', () => {
    const { queryByText, history } = renderWithRouter(<App />);

    history.push('/pokemons/25');

    expect(queryByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat/i).tagName).toEqual('P');
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Game Locations of <name>, , onde <name> é o nome do pokémon exibido', () => {
    const { queryByText, history } = renderWithRouter(<App />);

    history.push('/pokemons/25');

    expect(queryByText(/Game Locations of Pikachu/i).tagName).toEqual('H2');
  });

  test('A seção de detalhes deve exibir todas as localizações do pokémon', () => {
    const { queryAllByAltText, history } = renderWithRouter(<App />);

    history.push('/pokemons/25');

    expect(queryAllByAltText('Pikachu location')).toHaveLength(2);
  });

  test('Cada localização deve exibir o nome da localização e uma imagem do mapa da localização', () => {
    const { queryByText, queryAllByAltText, history } = renderWithRouter(<App />);

    history.push('/pokemons/25');

    expect(queryByText(/Kanto Viridian Forest/i)).toBeInTheDocument();
    expect(queryByText(/Kanto Power Plant/i)).toBeInTheDocument();
    expect(queryAllByAltText('Pikachu location')[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(queryAllByAltText('Pikachu location')[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('A página de detalhes deve permitir favoritar um pokémon', () => {
    const { queryByAltText, queryByLabelText, history } = renderWithRouter(<App />);

    history.push('/pokemons/25');

    expect(queryByLabelText(/Pokémon favoritado?/i)).toBeEnabled();
    fireEvent.click(queryByLabelText(/Pokémon favoritado?/i));

    expect(queryByAltText(/Pikachu is marked as favorite/i)).toBeInTheDocument();
    expect(queryByLabelText(/Pokémon favoritado?/i)).toBeChecked();
  });
});
