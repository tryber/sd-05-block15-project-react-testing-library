import React from 'react';
import { MemoryRouter } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

// const renderWithRouter = (component) => {
//   const history = createMemoryHistory();
//   return {
//     ...render(<Router history={history}>{component}</Router>), history,
//   };
// };

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('Links de navegação', () => {
  it('o primeiro link deve possuir o texto Home com a Url /', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getAllByRole('link')[0]).toHaveAttribute('href', '/');
    expect(getAllByRole('link')[0].innerHTML).toMatch(/home/i);
  });

  it('O segundo link deve possuir o texto About com a URL /about', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getAllByRole('link')[1]).toHaveAttribute('href', '/about');
    expect(getAllByRole('link')[1].innerHTML).toMatch(/about/i);
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons com a URL /favorites.', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getAllByRole('link')[2]).toHaveAttribute('href', '/favorites');
    expect(getAllByRole('link')[2].innerHTML).toMatch(/Favorite Pokémons/i);
  });
});

describe('Ao clicar no link', () => {
  it('Ao clicar no link "About" na barra de navegação, a aplicação deve ser redirecionada para a página de About, na URL "/about",', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('About').pathname).toBe('/about');

    fireEvent.click(getByText('About'));
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('Ao clicar no link "Home" na barra de navegação, a aplicação deve ser redirecionada para a página inicial, na URL "/"', () => {
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

  it('Ao clicar no link "Favorite Pokémons" na barra de navegação, a aplicação deve ser redirecionada para a página de pokémons favoritados, na URL "/favorites"', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Favorite Pokémons').pathname).toBe('/favorites');

    fireEvent.click(getByText('Favorite Pokémons'));
    expect(getByText('Favorite pokémons')).toBeInTheDocument();
  });

  it('ao não achar uma página, retorna page not found', () => {
    // const { getByText, history } = renderWithRouter(<App />);
    // history.push('/batatinha');

    const { getByText } = render(
      <MemoryRouter initialEntries={['buddybagetperu']}>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
