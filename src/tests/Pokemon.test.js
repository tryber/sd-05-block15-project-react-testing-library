import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

const renderWithRouter = (comp) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{comp}</Router>), history,
  };
};

test('it should render a card about specific pokemon with its name on it', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const cardName = getByTestId('pokemon-name');
  const cardType = getByTestId('pokemonType');
  const cardWeight = getByTestId('pokemon-weight');
  expect(cardName).toBeInTheDocument();
  // console.log(cardName);
  expect(cardName.innerHTML).toBe('Pikachu');
  expect(cardType).toBeInTheDocument();
  expect(cardType.innerHTML).toBe('Electric');
  expect(cardWeight).toBeInTheDocument();
});

test('average weight should appear in page with value and measurement unit', () => {
  const { getByTestId, getByText } = renderWithRouter(<App />);
  const cardWeight = getByTestId('pokemon-weight');
  expect(cardWeight).toBeInTheDocument();
  expect(getByText('Average weight:6.0kg')).toBeInTheDocument();
});

test('image should have src attribute and an alt text with pokemon name', () => {
  const { getByRole, getByAltText } = renderWithRouter(<App />);
  const imgTag = getByRole('img');
  expect(imgTag).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(getByAltText('Pikachu sprite')).toBeInTheDocument();
});

test('it should have a nav link with the id of pokemon, and that should redirect to page with pokemon details', () => {
  const { getByText } = renderWithRouter(<App />);
  const detailsLink = getByText('More details');
  expect(detailsLink).toBeInTheDocument();
  expect(detailsLink).toHaveAttribute('href', '/pokemons/25');
  fireEvent.click(detailsLink);
  expect(getByText('Pikachu Details')).toBeInTheDocument();
});

test('favorite pokemon should have a star icon', () => {
  const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);
  const detailsLink = getByText('More details');
  fireEvent.click(detailsLink);
  const labelFavorite = getByLabelText('Pokémon favoritado?');
  fireEvent.click(labelFavorite);
  const starIcon = getByAltText('Pikachu is marked as favorite');
  expect(starIcon).toBeInTheDocument();
  expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
});
