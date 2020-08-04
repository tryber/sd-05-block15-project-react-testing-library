import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import Pokedex from '../components/Pokedex';

test('renders a button with the text `proximo pokémon`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const button = getByText(/próximo pokémon/i);
  expect(button).toBeInTheDocument();
});

test('renders a button with the text `all`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const button = getByText(/All/i);
  expect(button).toBeInTheDocument();
});

test('test the button function with the text `all`', () => {
  jest.spyOn(Pokedex.prototype, 'filterPokemons');
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const button = getByText(/All/i);
  fireEvent.click(button);
  expect(Pokedex.prototype.filterPokemons).toHaveBeenCalled();
});

test('test the button function with the text `all`', () => {
  jest.spyOn(Pokedex.prototype, 'filterPokemons');
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const button = getByText(/All/i);
  fireEvent.click(button);
  expect(Pokedex.prototype.filterPokemons).toHaveBeenCalledWith('all');
});
