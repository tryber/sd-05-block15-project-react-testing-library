import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons',
  )).toBeInTheDocument();
});

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>), history,
  };
};

test('O primeiro link deve possuir o texto Home com a URL /', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const firstLink = getByText(/Home/i);
  fireEvent.click(firstLink);
  expect(history.location.pathname).toBe('/');
  expect(firstLink).toBeInTheDocument();
});

test('O segundo link deve possuir o texto About com a URL /about', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const secondLink = getByText(/About/i);
  fireEvent.click(secondLink);
  expect(history.location.pathname).toBe('/about');
  expect(secondLink).toBeInTheDocument();
});

test('O terceiro link deve possuir o texto Favorite Pokémons com a URL /favorites', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const thirdLink = getByText(/Favorite Pokémons/i);
  fireEvent.click(thirdLink);
  expect(history.location.pathname).toBe('/favorites');
  expect(thirdLink).toBeInTheDocument();
});
