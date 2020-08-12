import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../types/renderWithRouter';

test('Testes do arquivo Pokemon', () => {
  const { getByTestId, history, container, getByText, getByLabelText } = renderWithRouter(<App />);
  const textPikachuId = getByTestId(/pokemon-name/i);
  expect(textPikachuId.innerHTML).toBe('Pikachu');
  const textTypeId = getByTestId(/pokemonType/i);
  expect(textTypeId.innerHTML).toBe('Electric');
  const textAverageId = getByTestId(/pokemon-weight/i);
  expect(textAverageId.innerHTML).toBe('Average weight:6.0kg');
  const textDetails = getByText(/More Details/i);
  const procuraImg = container.querySelector('img');
  expect(procuraImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(procuraImg.alt).toBe('Pikachu sprite');
  fireEvent.click(textDetails);
  const caminho = history.location.pathname;
  expect(caminho).toBe('/pokemons/25');
  const favoritaPokemon = getByLabelText(/Pokémon favoritado/i);
  fireEvent.click(favoritaPokemon);
  const textBtnFavoritos = getByText(/Favorite Pokémons/i);
  fireEvent.click(textBtnFavoritos);
  const procuraImgEstrela = container.querySelectorAll('img');
  console.log(procuraImgEstrela);
  expect(procuraImgEstrela[1].src).toBe('http://localhost/star-icon.svg');
  expect(procuraImgEstrela[1].alt).toBe('Pikachu is marked as favorite');
});
