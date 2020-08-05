import React from 'react';
import {
  cleanup,
  render,
  fireEvent,
  getByAltText,
  getByLabelText,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

test('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon;O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon;A seção de detalhes deve conter um heading h2 com o texto Summary;A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado;A seção de detalhes deve conter um heading h2 com o texto Game Locations of <name>, , onde <name> é o nome do pokémon exibido;A seção de detalhes deve exibir todas as localizações do pokémon;A imagem da localização deve ter um atributo src com a URL da localização;Cada localização deve exibir o nome da localização e uma imagem do mapa da localização;A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do pokémon.', () => {
  const history = createMemoryHistory();
  history.push('/pokemons/25');
  const {
    getByText,
    queryByText,
    getAllByAltText,
    getByLabelText,
    getByAltText,
  } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  expect(getByText(/pikachu details/i)).toBeInTheDocument();
  expect(queryByText(/more details/i)).not.toBeInTheDocument();
  expect(getByText(/Summary/i).tagName).toEqual('H2');
  expect(
    getByText(
      /This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat/i,
    ).tagName,
  ).toEqual('P');
  expect(getByText(/Game Locations of Pikachu/i).tagName).toEqual('H2');
  expect(getAllByAltText('Pikachu location').length).toEqual(2);
  expect(getByText(/Kanto Viridian Forest/i)).toBeInTheDocument();
  expect(getAllByAltText('Pikachu location')[0]).toHaveAttribute(
    'src',
    'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
  );
  expect(getByText(/Kanto Power Plant/i)).toBeInTheDocument();
  expect(getAllByAltText('Pikachu location')[1]).toHaveAttribute(
    'src',
    'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
  );
  expect(getByLabelText(/Pokémon favoritado?/i)).toBeEnabled();
  fireEvent.click(getByLabelText(/Pokémon favoritado?/i));
  expect(getByAltText(/Pikachu is marked as favorite/i)).toBeInTheDocument();
  expect(getByLabelText(/Pokémon favoritado?/i)).toBeChecked();
  expect(getByLabelText(/Pokémon favoritado?/i).checked).toBeTruthy();
});
