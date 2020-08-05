import React from 'react';
import { MemoryRouter } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

// code initially given
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

// Beginning written code
test('O primeiro link deve possuir o texto Home com a URL /', () => {
  const { getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getAllByRole('link')[0]).toHaveAttribute('href', '/');
  expect(getAllByRole('link')[0].innerHTML).toMatch(/home/i);
});

test('O segundo link deve possuir o texto About com a URL /about', () => {
  const { getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getAllByRole('link')[1]).toHaveAttribute('href', '/about');
  expect(getAllByRole('link')[1].innerHTML).toMatch(/about/i);
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
  expect(getByText('About').pathname).toBe('/about');
  fireEvent.click(getByText('About'));
  expect(getByText(/About Pokédex/i)).toBeInTheDocument();
});

test('Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Home').pathname).toBe('/');
  fireEvent.click(getByText('About'));
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
    <MemoryRouter initialEntries={['blablastuffdoesnotexist']}>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('Page requested not found')).toBeInTheDocument();
});
