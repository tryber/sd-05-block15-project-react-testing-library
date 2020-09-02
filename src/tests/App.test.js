import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import { createMemoryHistory } from 'history';

import App from '../App';

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

test('links on the page', () => {
  const { getByText, queryAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  
  const links = queryAllByRole('link');
  expect(links[0].text).toBe('Home');
  expect(links[1].text).toBe('About');
  expect(links[2].text).toBe('Favorite Pokémons');
  expect(links[0].pathname).toBe(`/`);
  expect(links[1].pathname).toBe('/about');
  expect(links[2].pathname).toBe('/favorites');
  
});

test('page Not Found', () => {
  const history = createMemoryHistory();
  history.push('/batatinha');
  const { getByText, container } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const heading = getByText('Page requested not found');
  expect(heading).toBeInTheDocument();
});
