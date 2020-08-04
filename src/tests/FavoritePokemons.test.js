import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

test('', () => {
  const { getByText } = render(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );

  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});

test('', () => {
  const { getByText, getByLabelText, getAllByText } = render(<MemoryRouter><App /></MemoryRouter>);
  fireEvent.click(getByText(/more details/i));
  fireEvent.click(getByLabelText(/pokémon favoritado/i));
  fireEvent.click(getByText(/Favorite Pokémons/i));

  expect(getAllByText(/More details/i).length).toBe(2);
});

test('', () => {
  const { getByText, getByLabelText, getAllByText } = render(<MemoryRouter><App /></MemoryRouter>);
  fireEvent.click(getByText(/fire/i));
  fireEvent.click(getByText(/more details/i));
  fireEvent.click(getByLabelText(/pokémon favoritado/i));
  fireEvent.click(getByText(/Favorite Pokémons/i));

  expect(getAllByText(/More details/i).length).toBe(2);
});
