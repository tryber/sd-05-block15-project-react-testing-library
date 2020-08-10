import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

afterEach(cleanup);

test('Caso a pessoa não tenha pokémons favoritos, a mensagem "No favorite pokemon found" deve aparecer na tela', () => {
  const { getByText } = render(<FavoritePokemons />);
  expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
});

test('A página não deve exibir nenhum card de pokémon não favoritado', () => {
  const { getByText, getByLabelText, queryByText } = render(<MemoryRouter><App /></MemoryRouter>);
  fireEvent.click(getByText(/fire/i));
  fireEvent.click(getByText(/próximo pokémon/i));
  fireEvent.click(getByText(/more details/i));
  fireEvent.click(getByLabelText(/pokémon favoritado/i));
  fireEvent.click(getByText(/Favorite Pokémons/i));
  expect(getByText(/rapidash/i)).toBeInTheDocument();
  expect(queryByText(/charmander/i)).not.toBeInTheDocument();
  expect(queryByText(/pikachu/i)).not.toBeInTheDocument();
});

test('A página deve exibir todos os cards de pokémons favoritados', () => {
  const { getByText, getByLabelText, getAllByText } = render(<MemoryRouter><App /></MemoryRouter>);
  localStorage.clear();
  fireEvent.click(getByText(/bug/i));
  fireEvent.click(getByText(/more details/i));
  fireEvent.click(getByLabelText(/pokémon favoritado/i));
  fireEvent.click(getByText(/home/i));
  fireEvent.click(getByText(/fire/i));
  fireEvent.click(getByText(/more details/i));
  fireEvent.click(getByLabelText(/pokémon favoritado/i));
  fireEvent.click(getByText(/Favorite Pokémons/i));
  expect(getAllByText(/More details/i).length).toBe(2);
});
