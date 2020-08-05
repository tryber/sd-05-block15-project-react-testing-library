import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);


test('Ao carregar a aplicação no caminho de URL “/”, a página principal da Pokédex deve ser mostrada', () => {
  const { getByText } = render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
  expect(getByText(/encountered pokémons/i)).toBeInTheDocument();
  expect(getByText(/all/i)).toBeInTheDocument();
  expect(getByText(/próximo pokémon/i)).toBeInTheDocument();
});

describe('No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
  test('O primeiro link deve possuir o texto Home com a URL /', () => {
    const { getAllByRole } = render(<MemoryRouter><App /></MemoryRouter>);
    expect(getAllByRole('link')[0]).toHaveAttribute('href', '/');
    expect(getAllByRole('link')[0].innerHTML).toMatch(/home/i);
  });

  test('O segundo link deve possuir o texto About com a URL /about', () => {
    const { getAllByRole } = render(<MemoryRouter><App /></MemoryRouter>);
    expect(getAllByRole('link')[1]).toHaveAttribute('href', '/about');
    expect(getAllByRole('link')[1].innerHTML).toMatch(/about/i);
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons com a URL /favorites.', () => {
    const { getAllByRole } = render(<MemoryRouter><App /></MemoryRouter>);
    expect(getAllByRole('link')[2]).toHaveAttribute('href', '/favorites');
    expect(getAllByRole('link')[2].innerHTML).toMatch(/Favorite Pokémons/i);
  });
});

test('Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
  const { getByText } = render(<MemoryRouter initialEntries={['/about']}><App /></MemoryRouter>);
  expect(getByText(/about Pokédex/i)).toBeInTheDocument();
  fireEvent.click(getByText('Home'));
  expect(getByText('Home').pathname).toBe('/');
  expect(getByText(/encountered pokémons/i)).toBeInTheDocument();
});

test('Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de About, na URL "/about"', () => {
  const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
  expect(getByText(/encountered pokémons/i)).toBeInTheDocument();
  fireEvent.click(getByText('About'));
  expect(getByText('About').pathname).toBe('/about');
  expect(getByText(/about pokédex/i)).toBeInTheDocument();
});

test('Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"', () => {
  const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
  fireEvent.click(getByText('Favorite Pokémons'));
  expect(getByText('Favorite Pokémons').pathname).toBe('/favorites');
  expect(getByText('Favorite pokémons')).toBeInTheDocument();
});

test('Entrar em uma URL desconhecida exibe a página Not Found', () => {
  const { getByText } = render(<MemoryRouter initialEntries={['batatinha']}><App /></MemoryRouter>);
  expect(getByText('Page requested not found')).toBeInTheDocument();
});
