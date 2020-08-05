import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('testing pokedex component', () => {
  const { getByText, getAllByTestId, getAllByText, container } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const next = getByText('Próximo pokémon');
  expect(next).toBeInTheDocument();
  expect(getAllByTestId('pokemon-type-button').length).toBe(7);
  expect(getAllByTestId('next-pokemon').length).toBe(1);
  fireEvent.click(next);
  expect(getByText('Charmander')).toBeInTheDocument();
  fireEvent.click(next);
  fireEvent.click(next);
  fireEvent.click(next);
  fireEvent.click(next);
  fireEvent.click(next);
  fireEvent.click(next);
  fireEvent.click(next);
  expect(getByText('Dragonair')).toBeInTheDocument();
  fireEvent.click(next);
  expect(getByText('Pikachu')).toBeInTheDocument();
  const fire = getByText('Fire');
  fireEvent.click(fire);
  expect(getAllByText('Fire').length).toBe(2);
  const all = getByText('All');
  fireEvent.click(all);
  expect(container.querySelector('h2')).toBeInTheDocument();
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});
