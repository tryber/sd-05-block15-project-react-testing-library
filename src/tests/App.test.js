import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('deve renderizar o componente Home', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Home/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/');
  const aboutAll = getByText(/Encountered/i);
  expect(aboutAll).toBeInTheDocument();
});

test('deve renderizar o componente About', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/About/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/about');
  const aboutAll = getByText(/About Pokédex/i);
  expect(aboutAll).toBeInTheDocument();
});

test('deve renderizar o componente Favorite', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/favorites');
  const aboutAll = getByText(/Favorite pokémons/);
  expect(aboutAll).toBeInTheDocument();
});
