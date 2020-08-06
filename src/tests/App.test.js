// import history from 'history';
import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory as historic } from 'history';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
// import { screen } from '@testing-library/dom';


describe('Requirement One testing de Principal Page', () => {
  afterEach(cleanup);
  test('renders a bunch of links at the top of a Page with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();

    const links = [getByText(/Home/i), getByText(/About/i), getByText(/Favorite Pokémons/i)];

    links.forEach((link) => {
      expect(link).toBeInTheDocument();
    });
  });


  test('renders `Encountered pokémons` Page on the initial page and at the Home link', () => {
    const history = historic();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    // console.log(container);
    const rota = history.location.pathname;
    expect(rota).toBe('/');
    const heading = getByText(/Encountered pokémon/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders `About Pokédex` Page and route to `/about` after click on the link About', () => {
    const { getAllByRole, queryByText, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const rota = getAllByRole('link');
    expect(rota[1].getAttribute('href')).toBe('/about');

    fireEvent.click(rota[1]);
    const heading = queryByText(/About Pokédex/);
    expect(heading).toBeInTheDocument();
    expect(getByText('About').pathname).toBe('/about');
  });

  test('renders `Favorite Pokémons` Page and route to `/favorites` after click on the link Favorite Pokémons', () => {
    const { getAllByRole, queryByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const rota = getAllByRole('link');
    expect(rota[2].getAttribute('href')).toBe('/favorites');

    fireEvent.click(rota[2]);
    const heading = queryByText(/Favorite pokémons/);
    expect(heading).toBeInTheDocument();
  });

  test('renders `Not Found` Page if route is a unknown path', () => {
    const { container, getAllByRole } = render(
      <MemoryRouter initialEntries={['buddy batatinha']}>
        <App />
      </MemoryRouter>,
    );

    // const rota = getAllByRole('link');
    // // expect(rota[1].getAttribute('href')).toBe('/about');

    // fireEvent.click(rota[4]);
    // queryByText(/About Pokédex/);
    // screen.debug();
    expect(getAllByRole('heading')[1].innerHTML.substr(0, 24)).toBe('Page requested not found');
    expect(container).toBeInTheDocument();
  });
});
