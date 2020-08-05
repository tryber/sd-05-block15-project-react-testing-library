import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { FavoritePokemons } from '../components';
import App from '../App';

test('no favorite pokemons page', () => {
  const { getByText } = render(<FavoritePokemons />);

  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});

test('it renders all favorite cards', () => {
  const history = createMemoryHistory();
  const { getByText, getByLabelText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );

  const moreDetails = getByText(/more details/i);
  fireEvent.click(moreDetails);
  const labelFavorite = getByLabelText('Pokémon favoritado?');
  fireEvent.click(labelFavorite);
  const favPokemonsPage = getByText('Favorite Pokémons');
  fireEvent.click(favPokemonsPage);

  expect(getByText(/more details/i)).toBeInTheDocument();
});
