import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, cleanup, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

afterEach(cleanup);

test('renders `No favorite pokemon found`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );
  const NoFav = getByText('No favorite pokemon found');
  expect(NoFav).toBeInTheDocument();
});

test('navigating from home to fav pokemon clicking on one favorite', () => {
  const { getByText, getByLabelText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(getByText('More details'));
  fireEvent.click(getByLabelText('Pokémon favoritado?'));
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const Pika = getByText('Pikachu');
  expect(Pika).toBeInTheDocument();
  expect(getAllByText(/More details/i).length).toBe(1);
});

test('navigating from home to fav pokemons clicking on two favorites', () => {
  const { getByText, getByLabelText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  localStorage.clear();
  fireEvent.click(getByText('Fire'));
  fireEvent.click(getByText('More details'));
  fireEvent.click(getByLabelText('Pokémon favoritado?'));

  fireEvent.click(getByText('Home'));
  fireEvent.click(getByText('Bug'));
  fireEvent.click(getByText('More details'));
  fireEvent.click(getByLabelText('Pokémon favoritado?'));

  fireEvent.click(getByText(/Favorite Pokémons/i));
  // expect(Pika).toBeInTheDocument();
  expect(getAllByText(/More details/i).length).toBe(2);
});
