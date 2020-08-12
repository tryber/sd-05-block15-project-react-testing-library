import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('page contains the text <name> Details, where name refers to the pokemon', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  const name = getByTestId('pokemon-name').innerHTML;
  fireEvent.click(getByText('More details'));

  expect(getByText(`${name} Details`)).toBeInTheDocument();
});

test('doesnt show a link to "more details"', () => {
  const { getByText, queryByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText('More details'));

  expect(queryByText('More details')).not.toBeInTheDocument();
});

test('shows a summary heading"', () => {
  const { getByText, getAllByRole } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText('More details'));

  expect(getAllByRole('heading')[2].tagName).toBe('H2');
  expect(getAllByRole('heading')[2]).toHaveTextContent('Summary');
});

test('shows a paragraph with the pokemon details"', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/pokemons/25']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText(/This intelligent Pokémon/i)).toBeInTheDocument();
});


test('shows a maps section', () => {
  const { getByText, getByTestId, getAllByRole } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  const name = getByTestId('pokemon-name').innerHTML;

  fireEvent.click(getByText('More details'));

  expect(getAllByRole('heading')[3].tagName).toBe('H2');
  expect(getAllByRole('heading')[3]).toHaveTextContent('Game Locations of');
  expect(getAllByRole('img')[1]).toHaveProperty('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(getAllByRole('img')[1]).toHaveProperty('alt', `${name} location`);
});

test('allows the user to favorite pokemon', () => {
  const { getByText, getByLabelText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText('More details'));

  expect(getByLabelText('Pokémon favoritado?').checked).toEqual(false);
  fireEvent.click(getByLabelText('Pokémon favoritado?'));
});
