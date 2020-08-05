import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import Pokedex from '../components/Pokedex';

test('should be Encountered text', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const h2Text = getByText(/Encountered/i);
  expect(h2Text).toBeInTheDocument();
});

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

test('render all buttons with pokemon-type-button', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const buttons = getAllByTestId('pokemon-type-button');
  for (let i = 0; i < 7; i += 1) {
    expect(buttons[i]).toBeInTheDocument();
  }
});

test('verify if button `Próximo pokémon` is disabled when has one pokemon in group', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(getByText('Bug'));
  expect(getByText(/Próximo pokémon/i)).toBeDisabled();
});
