// Ajuda do Mitchell para fazer esse teste

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('Testando botão', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Pikachu')).toBeInTheDocument();
  fireEvent.click(getByText('Próximo pokémon'));
  expect(getByText('Charmander')).toBeInTheDocument();
  fireEvent.click(getByText('Próximo pokémon'));
  expect(getByText('Caterpie')).toBeInTheDocument();
  fireEvent.click(getByText('Próximo pokémon'));
  expect(getByText('Ekans')).toBeInTheDocument();
  fireEvent.click(getByText('Próximo pokémon'));
  fireEvent.click(getByText('Próximo pokémon'));
  fireEvent.click(getByText('Próximo pokémon'));
  fireEvent.click(getByText('Próximo pokémon'));
  fireEvent.click(getByText('Próximo pokémon'));
  fireEvent.click(getByText('Próximo pokémon'));
  expect(getByText('Pikachu')).toBeInTheDocument();
});

test('Testando se existe um pokemon por vez', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getAllByTestId('pokemon-name').length).toBe(1);
});

test('Testando botões de filtro', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText('Psychic'));
  expect(getByText('Alakazam')).toBeInTheDocument();
  fireEvent.click(getByText('Próximo pokémon'));
  expect(getByText('Mew')).toBeInTheDocument();
  fireEvent.click(getByText('Próximo pokémon'));
  expect(getByText('Alakazam')).toBeInTheDocument();
});

test('Testando botões de reset', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText('Psychic'));
  expect(getByText('Alakazam')).toBeInTheDocument();
  fireEvent.click(getByText('All'));
  expect(getByText('Pikachu')).toBeInTheDocument();
  fireEvent.click(getByText('Próximo pokémon'));
  expect(getByText('Charmander')).toBeInTheDocument();
  fireEvent.click(getByText('Próximo pokémon'));
  expect(getByText('Caterpie')).toBeInTheDocument();
});

test('Testando se existe todos os botões de filtro', () => {
  const { getAllByTestId } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getAllByTestId('pokemon-type-button').length).toBe(7);
});

test('Testando se o botão "Próximo Pokemon" desabilita', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText('Bug'));
  expect(getByText('Caterpie')).toBeInTheDocument();
  expect(getByText('Próximo pokémon')).toHaveAttribute('disabled');
});
