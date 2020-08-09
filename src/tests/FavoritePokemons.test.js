import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import Favorite from '../components/FavoritePokemons';

const renderWithRouter = (component) => {
  const historyFavorite = createMemoryHistory();
  return {
    ...render(<Router history={historyFavorite}>{component}</Router>), history,
  };
};

describe('Test Favorite Pokemons', () => {
  test('Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela.', () => {
    const { getByText } = renderWithRouter(<Favorite />);

    const favoritesTest = getByText(/No favorite pokemon found/);
    expect(favoritesTest).toBeInTheDocument();
  });
});
