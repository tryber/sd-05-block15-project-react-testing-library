import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';


function renderWithRouter(
  ui,
  { route = '/',
  history = createMemoryHistory({ initialEntries: [route] }) } = {},
  ) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

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
describe('Testando navegação', () => {
  afterEach(cleanup);

  test('Navegando home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const goHome = getByText(/Encountered pokémons/i);
    expect(goHome).toBeInTheDocument();
    fireEvent.click(goHome);
    expect(history.location.pathname).toBe('/');
  });
  // Testando o about
  test('Navegando about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const goAbout = getByText(/This application simulates/i);
    expect(goAbout).toBeInTheDocument();
    fireEvent.click(goAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('Navegando favoritos', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const goFav = getByText(/Favorite pokémons/i);
    expect(goFav).toBeInTheDocument();
    fireEvent.click(goFav);
    expect(history.location.pathname).toBe('/favorites');
  });
});
