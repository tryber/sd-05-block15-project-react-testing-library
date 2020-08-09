import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

const renderWithRouter = (reactComponent) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{reactComponent}</Router>), history,
  };
};

describe('page should have details of a specific pokemon', () => {
  test('pokemon card should not have a nav link to show details', () => {
    const { history, queryByText } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    expect(queryByText(/pikachu details/i)).toBeInTheDocument();
    expect(queryByText(/more details/i)).not.toBeInTheDocument();
  });

  test('it should have a heading with text summary', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    expect(getByText(/summary/i).tagName).toEqual('H2');
  });

  test('it should have a paragraph with summary text about pokemon', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    expect(getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat/i).tagName).toEqual('P');
  });

  test('it should have a game location section', () => {
    const { history, getByText, getAllByAltText } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    expect(getByText(/Game Locations of Pikachu/i).tagName).toEqual('H2');
    const allLocations = getAllByAltText(/Pikachu Location/i);
    expect(allLocations.length).toBe(2);
    expect(allLocations[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(allLocations[0]).toHaveAttribute('alt', 'Pikachu location');
  });

  test('page should have a checkbox to mark pokemon as favorite', () => {
    const { history, getByLabelText } = renderWithRouter(<App />);
    history.push('/pokemons/25');

    const checkboxFav = getByLabelText('Pokémon favoritado?');
    fireEvent.click(checkboxFav);
    expect(checkboxFav).toBeChecked();
    fireEvent.click(checkboxFav);
    expect(checkboxFav).not.toBeChecked();
  });
});
