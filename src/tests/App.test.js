import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../types/renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Ao carregar a aplicação no caminho de URL “/”, a página principal da Pokédex deve ser mostrada.', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const caminho = history.location.pathname;
  expect(caminho).toBe('/');
  const textHome = getByText(/Encountered pokémons/i);
  expect(textHome).toBeInTheDocument();
});

test('O primeiro link deve possuir o texto `Home` com a URL `/`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const caminho = history.location.pathname;
  const textHome = getByText(/Home/i);
  fireEvent.click(textHome);
  expect(textHome).toBeInTheDocument();
  expect(caminho).toBe('/');
});

test('O primeiro link deve possuir o texto `About` com a URL `/about`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const textAbout = getByText(/About/i);
  fireEvent.click(textAbout);
  const caminho = history.location.pathname;
  expect(textAbout).toBeInTheDocument();
  expect(caminho).toBe('/about');
});

test('O terceiro link deve possuir o texto `Favorite Pokémons` com a URL `/favorites`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const textFavorite = getByText(/Favorite Pokémons/i);
  fireEvent.click(textFavorite);
  const caminho = history.location.pathname;
  expect(textFavorite).toBeInTheDocument();
  expect(caminho).toBe('/favorites');
});

test('Entrar em uma URL desconhecida exibe a página `Not Found`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/blalbla');
  const textNotFound = getByText(/page requested not found/i);
  expect(textNotFound).toBeInTheDocument();
});
