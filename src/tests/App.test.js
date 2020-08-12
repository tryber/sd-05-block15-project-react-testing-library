import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
    /* MemoryRouter para ter controle do histórico e aí
  ter controle da navegaçao e testar os casos de uso
  de navegaçao */
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Testes do App.js', () => {
  afterEach(cleanup);

  test('Ao carregar a aplicação no caminho de URL “/”, a página principal da Pokédex deve ser mostrada', () => {
    const { history } = renderWithRouter(<App />);
    // eslint-disable-next-line prefer-destructuring
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
  });

  test('Ao clicar no link "Home", a aplicação deve ir para a página inicial, na URL "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText(/Home/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Home/i));
    const path = history.location.pathname;
    expect(path).toBe('/');
  });

  test('Ao clicar no link "About", a aplicação deve ser redirecionada na URL "/about"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText(/About/i)).toBeInTheDocument();
    fireEvent.click(getByText(/About/i));
    const path = history.location.pathname;
    expect(path).toBe('/about');
  });

  test('Ao clicar no link "Favorite Pokémons", a aplicação deve ser redirecionada na URL "/favorites"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Favorite Pokémons/i));
    // eslint-disable-next-line prefer-destructuring
    const path = history.location.pathname;
    expect(path).toBe('/favorites');
  });

  test('Testar renderização do Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/nao-existe/');
    const notFound = getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
