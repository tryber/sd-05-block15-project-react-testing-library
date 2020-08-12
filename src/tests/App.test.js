import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>), history,
  };
};

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
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('No topo da aplicação há um conjunto de links de navegação', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkHome = getByText(/Home/i);
  expect(linkHome).toBeInTheDocument();
  fireEvent.click(linkHome);
  expect(history.location.pathname).toBe('/');

  const linkAbout = getByText(/About/i);
  expect(linkAbout).toBeInTheDocument();
  fireEvent.click(linkAbout);
  expect(history.location.pathname).toBe('/about');

  const linkFavorite = getByText(/Favorite/i);
  expect(linkFavorite).toBeInTheDocument();
  fireEvent.click(linkFavorite);
  expect(history.location.pathname).toBe('/favorites');

  history.push('/blabla');
  const textNotFound = getByText(/page requested not found/i);
  expect(textNotFound).toBeInTheDocument();
});
