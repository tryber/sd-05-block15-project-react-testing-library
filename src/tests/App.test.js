import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import NotFound from '../components/NotFound';

describe('1. Testes do arquivo App.js', () => {
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

  test('1.2 - Verificando links da página', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const URLDefault = getByText(/Home/);
    expect(URLDefault).toBeInTheDocument();

    const URLAbout = getByText(/About/);
    expect(URLAbout).toBeInTheDocument();

    const URLFavorite = getByText(/Favorite/);
    expect(URLFavorite).toBeInTheDocument();
  });

  test('1.3, 1.4 e 1.5 - Verificar barra de navegação ao clicar no link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkHome = getByText(/Home/);
    fireEvent.click(linkHome);

    const linkAbout = getByText(/About/);
    fireEvent.click(linkAbout);

    const linkFavorite = getByText(/Favorite Pokémons/);
    fireEvent.click(linkFavorite);
  });

  test('1.6 - Entrar em uma URL desconhecida exibe a página Not Found', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    history.push('Page requested not found');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
