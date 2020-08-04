import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { cleanup, fireEvent, render } from '@testing-library/react';
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

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    BrowserRouter: ({ children }) => (<div>{children}</div>),
  };
});

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
  ) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

test('renders home page', () => {
  const { getByText } = renderWithRouter(<App />);
  const Titulo = getByText(/Pokédex/i);
  expect(Titulo).toBeInTheDocument();
});

test('checking the menu text', () => {
  const { getByText } = renderWithRouter(<App />);
  const HomeTxt = getByText(/Home/);
  expect(HomeTxt).toBeInTheDocument();
  const AboutTxt = getByText(/About/);
  expect(AboutTxt).toBeInTheDocument();
  const FavouriteTxt = getByText(/Favorite Pokémons/);
  expect(FavouriteTxt).toBeInTheDocument();
});

describe('routes', () => {
  afterEach(cleanup);

  test('navigating from home to About and back Home', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const Titulo = getByText(/Pokédex/i);
    expect(Titulo).toBeInTheDocument();

    fireEvent.click(getByText(/about/i));
    const AboutPath = history.location.pathname;
    expect(AboutPath).toBe('/about');
    const about = getByText(/About Pokédex/i);
    expect(about).toBeInTheDocument();

    fireEvent.click(getByText(/Home/i));
    const HomePath = history.location.pathname;
    expect(HomePath).toBe('/');
    const Home = getByText(/Pokédex/i);
    expect(Home).toBeInTheDocument();
  });

  test('navigating from home to Favorite Pokémons and back', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const Titulo = getByText(/Pokédex/i);
    expect(Titulo).toBeInTheDocument();

    fireEvent.click(getByText(/Favorite Pokémons/i));
    const FavPath = history.location.pathname;
    expect(FavPath).toBe('/favorites');

    fireEvent.click(getByText(/Home/i));
    const HomePath = history.location.pathname;
    expect(HomePath).toBe('/');
    const Home = getByText(/Pokédex/i);
    expect(Home).toBeInTheDocument();
  });
});
