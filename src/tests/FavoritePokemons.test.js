import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, cleanup, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

afterEach(cleanup);

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
  ) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

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
  const { getByText, getByLabelText, getAllByText } = renderWithRouter(<App />);
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
