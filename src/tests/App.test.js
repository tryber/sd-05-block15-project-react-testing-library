import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

// mock BrowserRouter para resetar o histórico de navegação
// toda vez que entra na página. Substituindo o BrowserRouter.
// Agora, retorna só uma div no lugar dele.

// jest.mock('react-router-dom', () => {
//   // faz uma cópia de todas as funções que estão dentro de react-router-dom
//   const originalModule = jest.requireActual('react-router-dom')
//   return {
//     ...originalModule,
//     BrowserRouter: ({ children }) => (<div>{children}</div>),
//   }
// })

// seta histórico novo de navegação ou, passado um parâmetro, seta o path onde está
// criação de um elemento encapsulado pelo Router, com um histórico novo, a cada teste
// que for feito, ou com um histórico diferente que se possa adicionar

function renderWithRouter(ui, { route = '/', history = createMemoryHistory(
{ initialEntries: [route] }) } = {}) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('Testes da página inicial', () => {
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

  describe('No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
    test('O primeiro link deve possuir o texto Home com a URL /', () => {
      const { getByText, history } = renderWithRouter(<App />);
      fireEvent.click(getByText(/home/i));
      const path = history.location.pathname;
      expect(path).toBe('/');
      const home = getByText(/encountered pokémons/i);
      expect(home).toBeInTheDocument();
    });

    test('O segundo link deve possuir o texto About com a URL /about', () => {
      const { getByText, history } = renderWithRouter(<App />);
      fireEvent.click(getByText(/about/i));
      const path = history.location.pathname;
      expect(path).toBe('/about');
      const about = getByText(/about pokédex/i);
      expect(about).toBeInTheDocument();
    });

    test('O terceiro link deve possuir o texto Favorite Pokémons com a URL /favorites', () => {
      const { getByText, history } = renderWithRouter(<App />);
      fireEvent.click(getByText(/favorite pokémons/i));
      const path = history.location.pathname;
      expect(path).toBe('/favorites');
      const favorite = getByText(/No favorite pokemon found/i);
      expect(favorite).toBeInTheDocument();
    });
  });
});
