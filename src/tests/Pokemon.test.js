import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Deve ser retornado um card com as informações de determinado pokémon', () => {
  const { getByTestId } = renderWithRouter(<App />);
  expect(getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
  expect(getByTestId('pokemonType').innerHTML).toBe('Electric');
  expect(getByTestId('pokemon-weight').innerHTML).toBe('Average weight:6.0kg');
});
