import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testes do arquivo App.js', () => {
  test('Ao carregar a aplicação no caminho de URL “/”, a página principal da Pokédex deve ser mostrada', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      );

    expect(getAllByRole('link')[0]).toHaveAttribute('href', '/');
    expect(getAllByRole('link')[1]).toHaveAttribute('href', '/about');
    expect(getAllByRole('link')[2]).toHaveAttribute('href', '/favorites');
  });

  test('O primeiro link deve possuir o texto Home com a URL /', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      );

    expect(getAllByRole('link')[0].innerHTML).toBe('Home');
  });

  test('O segundo link deve possuir o texto About com a URL /about', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      );

    expect(getAllByRole('link')[1].innerHTML).toBe('About');
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons com a URL /favorites', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      );

    expect(getAllByRole('link')[2].innerHTML).toBe('Favorite Pokémons');
  });

  test('Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      );

    fireEvent.click(getByText('Home'));
    expect(getByText(/próximo pokémon/i)).toBeInTheDocument();
  });

  test('Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de About, na URL "/about"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      );

    fireEvent.click(getByText('About'));
    expect(getByText(/about pokédex/i)).toBeInTheDocument();
  });

  test('Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      );

    fireEvent.click(getByText(/Favorite pokémons/i));
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  test('Entrar em uma URL desconhecida exibe a página Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe/');
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
