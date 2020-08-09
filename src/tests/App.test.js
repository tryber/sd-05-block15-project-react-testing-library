import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import App from '../App';

  afterEach(cleanup);

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