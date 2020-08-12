import React from 'react';
import App from '../App';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  // O botão deve conter o texto Próximo pokémon
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const buttonText = getByText(/Próximo/i);
  fireEvent.click(buttonText);
  fireEvent.click(buttonText);
  fireEvent.click(buttonText);
  fireEvent.click(buttonText);
  fireEvent.click(buttonText);
  fireEvent.click(buttonText);
  fireEvent.click(buttonText);
  fireEvent.click(buttonText);
  fireEvent.click(buttonText);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();
});

test('Teste id', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
    const testeId = getAllByTestId('pokemon-type-button');
    expect(testeId.length).toBe(7);
});

test('Próximo Pokémon', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const proximoPokemon = getByText(/Próximo pokémon/i);
  expect(proximoPokemon).toBeInTheDocument();
});

test('', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemonEncontrado = getByText(/Encountered pokémon/i);
  expect(pokemonEncontrado).toBeInTheDocument();
});
