import React from 'react';
import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    BrowserRouter: ({ children }) => (<div>{children}</div>)
  }
});

function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

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
    expect(home.href).toBe('http://localhost/');

    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
    expect(about.href).toBe('http://localhost/about');

    const favorite = getByText(/Favorite Pokémons/i);
    expect(favorite).toBeInTheDocument();
    expect(favorite.href).toBe('http://localhost/favorites');
  });
});

