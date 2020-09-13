import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('Testar botao proximo', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const next = getByText('Próximo pokémon');

  expect(next).toBeInTheDocument();
});

test('Encontrar pokemons', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const encontrar = getByText(/Encountered pokémons/i);

  expect(encontrar).toBeInTheDocument();
});

test('Texto All', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const all = getByText(/All/i);

  expect(all).toBeInTheDocument();
});

test('Button All', () => {
  const { getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const buttonAll = getAllByRole('button');

  expect(buttonAll).toBeInTheDocument();
});
