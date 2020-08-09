import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

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

test('navigation linnks exist', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/home/i);
  const about = getByText(/about/i);
  const favoritePokemons = getByText(/favorite pokémons/i);
  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favoritePokemons).toBeInTheDocument();
});

test('link home should render home page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/home/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/');
});

test('link about should render about page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/about/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/about');
});

test('link favorite pokemon should render favorite page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/favorite pokémons/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/favorites');
});

test('unexistent pathname should render Not Found page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/pagina/que-nao-existe/');
  const noMatch = getByText(/page requested not found/i);
  expect(noMatch).toBeInTheDocument();
});
