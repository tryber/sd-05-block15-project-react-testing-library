import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

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
  const { getByText, history } = renderWithRouter(<App />);
  const pathname = history.location.pathname;
  expect(pathname).toBe('/');
  expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
});

describe('No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
  test('O primeiro link deve possuir o texto `Home` que ao ser clicado direciona para URL `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText(/Home/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Home/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
  });
  test('O segundo link deve possuir o texto `About` que ao ser clicado direciona para URL `/about`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText(/About/i)).toBeInTheDocument();
    fireEvent.click(getByText(/About/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/about');
  });
  test('O terceiro link deve possuir o texto `Favorite Pokémons` que ao ser clicado direciona para URL `/favorites`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
  });
});

test('Entrar em uma URL desconhecida exibe a página `Not Found`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/tudo-errado');
  expect(getByText(/Not Found/i)).toBeInTheDocument();
});
