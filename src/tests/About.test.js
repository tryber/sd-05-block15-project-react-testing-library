import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import About from '../components/About';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>), history,
  };
};

test('A página "About" deve exibir informações sobre a Pokédex', () => {
  const { getAllByText } = renderWithRouter(<About />);
  const aboutPokedex = getAllByText(/Pokédex/i);
  expect(aboutPokedex.length).toBe(2);
});

test('A página deve conter um heading h2 com o texto About Pokédex', () => {
  const { getByText, getByRole } = renderWithRouter(<About />);
  const elementH2 = getByText(/About Pokédex/);
  expect(elementH2).toBeInTheDocument();
  // expect(elementH2.tagName).toEqual("H2");
  const h2 = getByRole('heading', { tagName: 'h2' });
  expect(h2).toBeInTheDocument();
});

test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
  const { getAllByText, getByText } = renderWithRouter(<About />);
  const elementP = getAllByText(/Pokédex/i);
  expect(elementP.length).toBe(2);
  const p = getByText(/This application simulates/i);
  expect(p).toBeInTheDocument();
});

test('A página deve conter a seguinte imagem de uma Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const src = getByRole('img');
  expect(src).toBeInTheDocument();
});

