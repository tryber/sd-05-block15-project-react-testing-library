import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import Pokedex from '../components/Pokedex';

test('resolve o problema de h2', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const aboutAll = getByText(/Encountered/i);
  expect(aboutAll).toBeInTheDocument();
});

test('renderiza um botão com o texto Próximo Pokémon', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const button = getByText(/próximo pokémon/i);
  expect(button).toBeInTheDocument();
});

test('renderiza um botão com o texto All', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const button = getByText(/all/i);
  expect(button).toBeInTheDocument();
});

test('testa a função apertando o botão All', () => {
  jest.spyOn(Pokedex.prototype, 'filterPokemons');
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const button = getByText(/all/i);
  fireEvent.click(button);
  expect(Pokedex.prototype.filterPokemons).toHaveBeenCalled();
});

test('testa a função apertando o botão All', () => {
  jest.spyOn(Pokedex.prototype, 'filterPokemons');
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const button = getByText(/all/i);
  fireEvent.click(button);
  expect(Pokedex.prototype.filterPokemons).toHaveBeenCalledWith('all');
});

test('renderiza e verifica se todos botões com o id pokemon-type-button existem', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const button = getAllByTestId('pokemon-type-button');
  for (let i = 0; i < 7; i += 1) {
    expect(button[i]).toBeInTheDocument();
  }
});

test('verificando se o botão de Próximo Pokemon desabilita quando chamado em um grupo com um só pokemon', () => {
  const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
  fireEvent.click(getByText('Poison'));
  expect(getByText(/próximo pokémon/i)).toBeDisabled();
});
