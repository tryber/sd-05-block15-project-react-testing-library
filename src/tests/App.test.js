import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Ao carregar a aplicação no caminho de URL “/”, a página principal da Pokédex deve ser mostrada', () => {
  test('renderiza um header com o texto `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText(/Pokédex/i)).toBeInTheDocument();
  });

  test('mostra a Pokédex quando a rota é `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
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
});
describe('Ao clicar nos links de navegação da página', () => {
  test('Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('About').pathname).toBe('/about');
    fireEvent.click(getByText('About'));
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  test('Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de About, na URL "/about"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Home').pathname).toBe('/');
    fireEvent.click(getByText('About'));
    expect(getByText('About Pokédex')).toBeInTheDocument();
    fireEvent.click(getByText('Home'));
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
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

  describe('Entrar em uma URL desconhecida', () => {
    it('exibe a página Not Found', () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={['URL-da-batatinha']}>
          <App />
        </MemoryRouter>,
      );
      // outra forma de fazer sem usar o "initialEntries" é com o history.push, como abaixo:
      // const { getByText, history } = renderWithRouter(<App />);
      // history.push('/batatinha');
      expect(getByText('Page requested not found')).toBeInTheDocument();
    });
  });
});
