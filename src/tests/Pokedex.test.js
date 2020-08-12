import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import App from '../App';
// import renderWithRouter from '../components/renderWithRouter';

test('O botão de próximo deve exibir o próximo pokémon da lista', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const button = getByText(/próximo/i);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  const pikachu = getByText(/Pikachu/i);
  expect(pikachu).toBeInTheDocument();
});

test('Teste id', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const id = getAllByTestId(/pokemon-type-button/);
  expect(id.length).toBe(7);
});

test('Próximo Pokemon', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const pokemon = getByText(/Próximo pokémon/i);
  expect(pokemon).toBeInTheDocument();
});

test('Encontrado Pokemon', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const encontrado = getByText(/encountered pokémons/i);
  expect(encontrado).toBeInTheDocument();
});
