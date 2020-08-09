import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('routes', () => {
  afterEach(cleanup);

  test('O primeiro link deve possuir o texto Home com a URL /', () => {
    const history = createMemoryHistory();

    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    const homePage = getByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();

    fireEvent.click(getByText(/Home/i));

    const home = getByText(/Encountered pokémons/i);
    expect(home).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto About com a URL /about', () => {
    const history = createMemoryHistory();

    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    const homePage = getByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();

    fireEvent.click(getByText(/About/i));

    const about = getByText(/About Pokédex/i);
    expect(about).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto Favorite pokémons com a URL /favorites', () => {
    const history = createMemoryHistory();

    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    const homePage = getByText(/Encountered pokémons/i);
    expect(homePage).toBeInTheDocument();

    fireEvent.click(getByText(/Favorite Pokémons/));

    const favoritesTest = getByText(/Favorite pokémons/);
    expect(favoritesTest).toBeInTheDocument();
  });

  test('Entrar em uma URL desconhecida exibe a página Not Found', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/not-found']}>
        <App />
      </MemoryRouter>,
    );
    const erro = getByText(/Page requested not found/);
    expect(erro).toBeInTheDocument();
  });
});
