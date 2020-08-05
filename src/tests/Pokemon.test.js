import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  render,
  fireEvent,
} from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

test('should render a Card of Pokémon', () => {
  const { getByTestId, container, getByAltText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemon = container.querySelectorAll('.pokemon');
  const name = getByTestId('pokemon-name');
  const type = getByTestId('pokemonType');
  const weight = getByTestId('pokemon-weight');
  const img = getByAltText('Pikachu sprite');
  expect(...pokemon).toBeInTheDocument();
  expect(name).toHaveTextContent('Pikachu');
  expect(weight).toHaveTextContent('Average weight:6.0kg');
  expect(type).toHaveTextContent('Electric');
  expect(img.src).toBe(
    'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  );
});

test('deve abrir o botão More Details com detalhes do Pokémon', () => {
  const { getByText, history, getByLabelText, getByAltText } = renderWithRouter(
    <App />,
  );
  fireEvent.click(getByText(/More Details/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/pokemons/25');

  fireEvent.click(getByLabelText('Pokémon favoritado?'));
  fireEvent.click(getByText('Home'));
  const pokemonFav = getByAltText('Pikachu is marked as favorite');
  expect(pokemonFav).toBeInTheDocument();
  expect(pokemonFav.src).toBe('http://localhost/star-icon.svg');
  expect(pokemonFav.alt).toBe('Pikachu is marked as favorite');
});
