import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import About from '../components/About';
import App from '../App';

afterEach(cleanup);

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>), history,
  };
};

test('link about should render about page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/about/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/about');
});

test('about page should have heading About pokedex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const h2 = getByRole('heading');
  expect(h2).toBeInTheDocument();
  expect(h2.innerHTML).toBe('About Pokédex');
});

test('about page should have two paragraphs', () => {
  const { getByText } = renderWithRouter(<About />);
  const p1 = getByText(/This application simulates a Pokédex, a digital encliclopedia containing all Pokémons/i);
  const p2 = getByText(/One can filter Pokémons by type, and see more details for each one of them/i);
  const allps = [p1, p2];
  expect(p1).toBeInTheDocument();
  expect(p2).toBeInTheDocument();
  expect(allps.length).toBe(2);
});

test('about page should have pokedex image', () => {
  const { getByRole } = renderWithRouter(<About />);
  const img = getByRole('img');
  expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
