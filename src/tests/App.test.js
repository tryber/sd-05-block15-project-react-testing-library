import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';
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

test('O primeiro link deve possuir o texto  Home com a URL / ', () => {
  const { getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getAllByRole('link')[0].innerHTML).toMatch(/home/i);
  expect(getAllByRole('link')[0]).toHaveAttribute('href', '/');
});

test('O segundo link deve possuir o texto About com a URL /about', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/about/i)).toHaveAttribute('href', '/about');
});
test('O terceiro link deve possuir o texto Favorite Pokémons com a URL /favorites.', () => {
  const { getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getAllByRole('link')[2]).toHaveAttribute('href', '/favorites');
  expect(getAllByRole('link')[2].innerHTML).toMatch(/Favorite Pokémons/i);
});
test('Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(getByText('About'));
  expect(getByText('About').pathname).toBe('/about');
  expect(getByText(/About Pokédex/i)).toBeInTheDocument();
});

test('Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText('About'));
  expect(getByText('Home').pathname).toBe('/');
  expect(getByText('About Pokédex')).toBeInTheDocument();
  fireEvent.click(getByText('Home'));
  expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
});
test('Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Favorite Pokémons').pathname).toBe('/favorites');
  fireEvent.click(getByText('Favorite Pokémons'));
  expect(getByText('Favorite pokémons')).toBeInTheDocument();
});
test('Entrar em uma URL desconhecida exibe a página Not Found', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['N']}>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Page requested not found')).toBeInTheDocument();
});
