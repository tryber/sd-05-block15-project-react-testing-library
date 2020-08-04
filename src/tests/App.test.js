import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
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

test('O primeiro link deve possuir o texto  Home com a URL / ', () => {
  const { getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getAllByRole('link')[0]).toHaveAttribute('href', '/');
  expect(getAllByRole('link')[0].innerHTML).toMatch(/home/i);
});

test('O segundo link deve possuir o texto `About` com a URL `/about', () => {
  const { getByText } = renderWithRouter(<App />);
  const memory = createMemoryHistory();
  memory.push('/favorites');
  const textAbout = getByText(/favorite pokémons/i);
  expect(textAbout).toBeInTheDocument();
});

test('Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/" ', () => {
  const { getByText } = renderWithRouter(<App />);
  const memory = createMemoryHistory();
  history.push('/');
  fireEvent.click(getByText(/home/i));
  expect(memory.location.pathname).toBe('/about');
});

test('Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de About, na URL "/about ', () => {
  const { getByText } = renderWithRouter(<app />);
  const memory = createMemoryHistory();
  memory.push('/about');
  fireEvent.click(getByText(/about/i));
  expect(memory.location.pathname).toBe('/about');
});
test('Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites ', () => {
  const { getByText } = renderWithRouter(<App />);
  const memory = createMemoryHistory();
  memory.push('/favorites');
  fireEvent.click(getByText(/favorite pokémons/i));
  expect(memory.location.pathname).toBe('/favorites');
});
test('Entrar em uma URL desconhecida exibe a página Not Found', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  expect(getByText(/page requested not found/i)).toBeInTheDocument();
});
