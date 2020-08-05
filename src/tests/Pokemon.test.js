import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { fireEvent } from '@testing-library/react';

test('Testes do arquivo Pokemon.js', () => {
  const { getByLabelText, getByText, getByTestId, container, history } = renderWithRouter(<App />);
  expect(getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
  expect(getByTestId('pokemonType').innerHTML).toBe('Electric');
  expect(getByTestId('pokemon-weight').innerHTML).toBe('Average weight:6.0kg');
  fireEvent.click(getByText('More details'));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/pokemons/25');
  expect(container.querySelector('img').alt).toBe('Pikachu sprite');
  expect(container.querySelector('img').src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  fireEvent.click(getByLabelText('Pokémon favoritado?'));
  fireEvent.click(getByText('Favorite Pokémons'));
  expect(container.querySelectorAll('img')[1].src).toBe('http://localhost/star-icon.svg');
  expect(container.querySelectorAll('img')[1].alt).toBe('Pikachu is marked as favorite');
});
