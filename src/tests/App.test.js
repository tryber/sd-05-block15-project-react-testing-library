import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
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

test('Ao carregar a aplicação no caminho de URL “/”, a página principal da Pokédex deve ser mostrada.', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const path = history.location.pathname;
  expect(path).toBe('/');
  const text = getByText(/Encountered pokémons/);
  expect(text).toBeInTheDocument();
});

describe('No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
  describe('O primeiro link deve possuir o texto Home com a URL /', () => {
    test('O Link deve possuir o texto Home', () => {
      const history = createMemoryHistory();
      const { getByText } = render(
        <Router history={history}>
          <App />
        </Router>,
      );
      const link = getByText(/Home/);
      expect(link).toBeInTheDocument();
    });

    test('Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
      const history = createMemoryHistory();
      const { getByText } = render(
        <Router history={history}>
          <App />
        </Router>,
      );
      const link = getByText(/Home/);
      fireEvent.click(link);
      const path = history.location.pathname;
      expect(path).toBe('/');
    });
  });

  describe('O segundo link deve possuir o texto About com a URL /about', () => {
    test('O Link deve possuir o texto About', () => {
      const history = createMemoryHistory();
      const { getByText } = render(
        <Router history={history}>
          <App />
        </Router>,
      );
      const link = getByText(/About/);
      expect(link).toBeInTheDocument();
    });

    test('Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de About, na URL "/about"', () => {
      const history = createMemoryHistory();
      const { getByText } = render(
        <Router history={history}>
          <App />
        </Router>,
      );
      const link = getByText(/About/);
      fireEvent.click(link);
      const path = history.location.pathname;
      expect(path).toBe('/about');
    });
  });

  describe('O terceiro link deve possuir o texto Favorite Pokémons com a URL /favorites', () => {
    test('O Link deve possuir o texto Favorite Pokémons', () => {
      const history = createMemoryHistory();
      const { getByText } = render(
        <Router history={history}>
          <App />
        </Router>,
      );
      const link = getByText(/Favorite Pokémons/);
      expect(link).toBeInTheDocument();
    });

    test('Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"', () => {
      const history = createMemoryHistory();
      const { getByText } = render(
        <Router history={history}>
          <App />
        </Router>,
      );
      const link = getByText(/Favorite Pokémons/);
      fireEvent.click(link);
      const path = history.location.pathname;
      expect(path).toBe('/favorites');
    });
  });

  test('Entrar em uma URL desconhecida exibe a página Not Found', () => {
    const history = createMemoryHistory();
    history.push('/biruliru');
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const notFoundText = getByText(/Page requested not found/);
    expect(notFoundText).toBeInTheDocument();
  });
});
