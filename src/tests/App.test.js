import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent, getByText } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
import NotFound from '../components/NotFound';

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

test('Ao carregar a aplicação no caminho de URL “/”, a página principal da Pokédex deve ser mostrada', () => {
  const { getByText } = renderWithRouter(<App />);
  const history = createMemoryHistory();
  history.push('/');
  const text = getByText(/encountered pokémons/i);
  expect(history.location.pathname).toBe('/');
  expect(text).toBeInTheDocument();
});

describe('No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
  test('O primeiro link deve possuir o texto Home com a URL /', () => {
    const { getByText } = renderWithRouter(<App />);
    const history = createMemoryHistory();
    history.push('/');
    const text = getByText(/home/i);
    expect(text).toBeInTheDocument();
  });
  test('O segundo link deve possuir o texto About com a URL /about', () => {
    const { getByText } = renderWithRouter(<App />);
    const history = createMemoryHistory();
    history.push('/about');
    const text = getByText(/about/i);
    expect(text).toBeInTheDocument();
  });
  test('O terceiro link deve possuir o texto Favorite Pokémons com a URL /favorites', () => {
    const { getByText } = renderWithRouter(<App />);
    const history = createMemoryHistory();
    history.push('/favorites');
    const text = getByText(/favorite pokémons/i);
    expect(text).toBeInTheDocument();
  });
});

test('Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL /', () => {
  const { getByText } = renderWithRouter(<App />);
  const history = createMemoryHistory();
  history.push('/');
  fireEvent.click(getByText(/home/i));
  expect(history.location.pathname).toBe('/');
});

test('Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de About, na URL "/about', () => {
  const { getByText } = renderWithRouter(<App />);
  const history = createMemoryHistory();
  history.push('/about');
  fireEvent.click(getByText(/about/i));
  expect(history.location.pathname).toBe('/about');
});

test('Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites', () => {
  const { getByText } = renderWithRouter(<App />);
  const history = createMemoryHistory();
  history.push('/favorites');
  fireEvent.click(getByText(/favorite pokémons/i));
  expect(history.location.pathname).toBe('/favorites');
});

test('Entrar em uma URL desconhecida exibe a página Not Found', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  expect(getByText(/page requested not found/i)).toBeInTheDocument();
});
