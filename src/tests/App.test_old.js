import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    BrowserRouter: (children) => (<div>{children}</div>),
  };
});

function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
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

describe('testes envolvendo o roteamento', () => {
  afterEach(cleanup);
  it('verifica que o caminho / endereça a página principal', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const initialPage = getByText(/Pokédex/i);
    expect(initialPage).toBeInTheDocument();
  });

  it('verifica se na página principal, O primeiro link possui Home e enderaça a /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const home = getByText(/home/i);
    expect(home).toBeInTheDocument();
    fireEvent.click(home);
    const realPath = history.location.pathname;
    expect(realPath).toBe('/');
  });

  it('verifica se na página principal, O segundo link possui About e enderaça a /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
    fireEvent.click(about);
    const realPath = history.location.pathname;
    expect(realPath).toBe('/about');
  });

  it('verifica se na página principal, O terceiro link possui Favorite Pokémons e enderaça a /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/');
    const favorites = getByText(/Favorite Pokémons/i);
    expect(favorites).toBeInTheDocument();
    fireEvent.click(favorites);
    const realPath = history.location.pathname;
    expect(realPath).toBe('/favorites');
  });

  it('verifica se ao entrar uma página desconhecida, a página Not Found é apresentada', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/paginaquenaoexiste/testando');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
