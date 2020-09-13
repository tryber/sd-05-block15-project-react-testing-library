// Ajuda do Mitchell para fazer esse teste

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);
test('Testando botão', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Pikachu')).toBeInTheDocument();
  fireEvent.click('Próximo Pokemon');
  expect(getByText('Charmander')).toBeInTheDocument();
  fireEvent.click('Próximo Pokemon');
  expect(getByText('Caterpie')).toBeInTheDocument();
  fireEvent.click('Próximo Pokemon');
  expect(getByText('Ekans')).toBeInTheDocument();
  fireEvent.click('Próximo Pokemon');
  fireEvent.click('Próximo Pokemon');
  fireEvent.click('Próximo Pokemon');
  fireEvent.click('Próximo Pokemon');
  fireEvent.click('Próximo Pokemon');
  fireEvent.click('Próximo Pokemon');
  expect(getByText('Pikachu')).toBeInTheDocument();
});

test('Testando se existe um pokemon por vez', () => {
  const { getAllByTestId } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getAllByTestId('pokemon-name'.length)).toBe(1);
});

test('Testando botões de filtro', () => {
  const { getByText, getAllByTestId } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click('Psychic');
  expect(getByText('Alakazam')).toBeInTheDocument();
  fireEvent.click('Próximo Pokemon');
  expect(getByText('Mew')).toBeInTheDocument();
  fireEvent.click('Próximo Pokemon');
  expect(getByText('Alakazam')).toBeInTheDocument();
});

test('Testando botões de reset', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click('Psychic');
  expect(getByText('Alakazam')).toBeInTheDocument();
  fireEvent.click('All');
  expect(getByText('Electric')).toBeInTheDocument();
  fireEvent.click('Próximo Pokemon');
  expect(getByText('Fire')).toBeInTheDocument();
  fireEvent.click('Próximo Pokemon');
  expect(getByText('Bug')).toBeInTheDocument();
});

test('Testando se existe todos os botões de filtro', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Psychic')).toBeInTheDocument();
  expect(getByText('Electric')).toBeInTheDocument();
  expect(getByText('Fire')).toBeInTheDocument();
  expect(getByText('Normal')).toBeInTheDocument();
  expect(getByText('All')).toBeInTheDocument();
});

test('Testando se o botão "Próximo Pokemon" desabilita', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click('Bug');
  expect(getByText('Caterpie')).toBeInTheDocument();
  expect(getByText('Próximo Pokemon')).toHaveAttribute('disabled');
});
