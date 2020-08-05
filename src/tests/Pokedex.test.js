import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('testing pokedex component', () => {
  const { getByText, getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  )
  const next = getByText('Próximo pokémon');
  expect(next).toBeInTheDocument();
  expect(getAllByTestId('pokemon-type-button').length).toBe(7);
  expect(getAllByTestId('next-pokemon').length).toBe(1);
  fireEvent.click(next);
  expect(getByText('Charmander')).toBeInTheDocument;
  fireEvent.click(next);
  expect(getByText('Caterpie')).toBeInTheDocument;
  fireEvent.click(next);
  expect(getByText('Ekans')).toBeInTheDocument;
  fireEvent.click(next);
  expect(getByText('Alakazam')).toBeInTheDocument;
  fireEvent.click(next);
  expect(getByText('Mew')).toBeInTheDocument;
  fireEvent.click(next);
  expect(getByText('Rapidash')).toBeInTheDocument;
  fireEvent.click(next);
  expect(getByText('Snorlax')).toBeInTheDocument;
  fireEvent.click(next);
  expect(getByText('Dragonair')).toBeInTheDocument;
  fireEvent.click(next);
  expect(getByText('Pikachu')).toBeInTheDocument;
}); 