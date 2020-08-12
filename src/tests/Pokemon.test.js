import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

function renderWithRouter3(
  ui,
  { route = '/',
  history = createMemoryHistory({ initialEntries: [route] }) } = {},
  ) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}
describe('Teste do Pokemon.js', () => {
  test('Testes do card de Fire', () => {
    const { getByText, getByTestId, getByAltText } = renderWithRouter3(<App />);
    const testFireCard = getByText(/Fire/i);
    fireEvent.click(testFireCard);
    const cardName = getByTestId(/pokemon-name/i);
    expect(cardName.innerHTML).toBe('Charmander');
    const cardType = getByTestId(/pokemonType/i);
    expect(cardType.innerHTML).toBe('Fire');
    const cardWeight = getByTestId(/pokemon-weight/i);
    expect(cardWeight.innerHTML).toBe('Average weight:8.5kg');
    const cardDetailsLink = getByText(/More Details/i);
    expect(cardDetailsLink).toBeInTheDocument();
    const cardImg = getByAltText('Charmander sprite');
    expect(cardImg).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });
  test('Teste do icone de favoritos', () => {
    const { getByAltText, getByRole, getByText } = renderWithRouter3(<App />);
    const moreDetails = getByText(/More Details/i);
    fireEvent.click(moreDetails);
    const favoriteBtnFalse = getByRole('checkbox', { checked: false });
    fireEvent.click(favoriteBtnFalse);
    const iconImg = getByAltText('Pikachu is marked as favorite');
    expect(iconImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
