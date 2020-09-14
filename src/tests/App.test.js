import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

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

/* Test URLS Home = "/", About = "/about", Favourite Pokémons ="/favorites"
const URLS = [
  { text: '/home/i', location: '/' },
  { text: '/about/i', location: '/about' },
  { text: '/favorite pokémons/i', location: '/favorites' },
]; */

describe('No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
  test('O primeiro link deve possuir o texto Home com a URL/', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getAllByRole('link')[0]).toHaveAttribute('href', '/');
    expect(getAllByRole('link')[0].innerHTML).toBe('Home');
  });
  test('O segundo link deve possuir o texto About com a URL /about', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getAllByRole('link')[1]).toHaveAttribute('href', '/about');
    expect(getAllByRole('link')[1].innerHTML).toBe('About');
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons com a URL /favorites.', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getAllByRole('link')[2]).toHaveAttribute('href', '/favorites');
    expect(getAllByRole('link')[2].innerHTML).toBe('Favorite Pokémons');
  });
});

describe('Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
  test('testing Link', () => {
    const history = createMemoryHistory();
    const { container, getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    fireEvent.click(getByText(/home/i));
    expect(container.innerHTML).toMatch(/Encountered pokémons/i);
  });
});

describe('Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de About, na URL "/about"', () => {
  test('testing Link', () => {
    const history = createMemoryHistory();
    const { container, getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    fireEvent.click(getByText(/about/i));
    expect(container.innerHTML).toMatch(/About Pokédex/i);
  });
});

describe('Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"', () => {
  test('testing Link', () => {
    const history = createMemoryHistory();
    const { container, getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    fireEvent.click(getByText(/favorite pokémons/i));
    expect(container.innerHTML).toMatch(/Favorite pokémons/i);
  });
});

describe('Entrar em uma URL desconhecida exibe a página Not Found', () => {
  test('erro', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/notfound']}>
        <App />
      </MemoryRouter>,
    );
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
