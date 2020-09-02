import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import NotFound from '../components/NotFound';

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
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  createMemoryHistory('/');
  const page = getByText(/Encountered pokémons/i);
  expect(page).toBeInTheDocument();
});
describe('No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
  test('O primeiro link deve possuir o texto Home com a URL /', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    createMemoryHistory('/');
    const Home = getByText(/home/i);
    expect(Home).toBeInTheDocument();
  });
  test('O segundo link deve possuir o texto About com a URL /about', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    createMemoryHistory('/about');
    const About = getByText(/about/i);
    expect(About).toBeInTheDocument();
  });
  test('O terceiro link deve possuir o texto Favorite Pokémons com a URL /favorites', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    createMemoryHistory('/favorites');
    const Favorites = getByText(/favorites/i);
    expect(Favorites).toBeInTheDocument();
  });
});
test('Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const history = createMemoryHistory('/');
  const Home = getByText(/home/i);
  fireEvent.click(Home);
  expect(history.location.pathname).toBe('/');
});
test('Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de About, na URL "/about"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const history = createMemoryHistory('/about');
  fireEvent.click(getByText(/about/i));
  expect(history.location.pathname).toBe('/about');
});
test('Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const history = createMemoryHistory('/favorites');
  fireEvent.click(getByText(/favorite pokémons/i));
  expect(history.location.pathname).toBe('/favorites');
});
test('Entrar em uma URL desconhecida exibe a página Not Found', () => {
  const { getByText } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  expect(getByText(/page request not found/i)).toBeInTheDocument();
});
