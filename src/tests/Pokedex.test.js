import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('A página deve exibir o próximo pokémon da lista', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />;
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
  const Pikachu = getByText(/Pikachu/i);
  expect(Pikachu).toBeInTheDocument();
});

test('Teste ID', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const testId = getAllByTestId('pokemon-type-button');
  expect(testId.length).toBe(7);
});

test('Proximo Pokemon', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />;
    </MemoryRouter>,
  );
  const proximoPokemon = getByText(/Próximo pokémon/i);
  expect(proximoPokemon).toBeInTheDocument();
});

test('Encontrado Pokemon', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />;
    </MemoryRouter>,
  );
  const encontradoPokemon = getByText(/Encountered pokémons/i);
  expect(encontradoPokemon).toBeInTheDocument();
});
