import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('renders a heading with the text `Pokédex`', () => {
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

describe('there\'s a menu with links to all pages', () => {
  test('shows a link to the homepage', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Home')).toHaveProperty('href', 'http://localhost/');
  });

  test('shows a link to the about page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('About')).toHaveProperty('href', 'http://localhost/about');
  });

  test('shows a link to the fav pokemons page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toHaveProperty('href', 'http://localhost/favorites');
  });
});


test('renders 404 page when in a unknown page', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/blabla']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Page requested not found')).toBeInTheDocument();
});
