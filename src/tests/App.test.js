import React from 'react';
import { Router } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from '../App';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    BrowserRouter: ({ children }) => <div>{children}</div>,
  };
});

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route], }) } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

/* const renderPath = (path) => {
  const history = createBrowserHistory();
  history.push(path);
  const { ...resources } = render(
    <Router history={history}>
      <App />
    </Router>
  );
  return { ...resources };
}; */

describe('renderiza o título da página e a barra de navegação', () => {
  afterEach(cleanup);

  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('renderiza a barra de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
    expect(home.href).toMatch('/');

    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
    expect(about.href).toMatch('/about');

    const favorite = getByText(/Favorite Pokémons/i);
    expect(favorite).toBeInTheDocument();
    expect(favorite.href).toMatch('/favorites');
  });
});

describe('ao clicar na barra de navegaçõ a url da página deve ser modificada', () => {
  afterEach(cleanup);

  test('ao clicar no link Home a aplicação vai para /', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    fireEvent.click(home);
    expect(location.pathname).toBe('/');
  });

  test('ao clicar no link About a aplicação vai para /about', () => {
    const app = renderWithRouter(<App />);
    const about = app.getByText(/About/i);
    fireEvent.click(about);
    expect(app.getByText(/This application simulates a Pokédex/)).toBeInTheDocument();
    console.log(app.history.location.pathname);
    expect(app.history.location.pathname).toBe('/about');
  });

  test('ao clicar no link Favorite Pokemons a aplicação vai para /favorites', () => {
    const app = renderWithRouter(<App />);
    const favorites = app.getByText(/Favorite Pokémons/i);
    fireEvent.click(favorites);
    expect(app.history.location.pathname).toBe('/favorites');
  });

  /* skip test('ao carregar uma path inexistente é mostrada a página not found', () => {
    expect(location.pathname).toBe('/notFound');
  }); */
});
