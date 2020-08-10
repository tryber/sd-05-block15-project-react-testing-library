import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Testando o App.js', () => {
  test('Ao carregar a aplicação no caminho de URL “/”, a página principal da Pokédex deve ser mostrada.', () => {
    const history = createMemoryHistory();
    const { getByText } = render(<Router history={history}><App /></Router>);
    const path = history.location.pathname;
    expect(path).toBe('/');
    const initialText = getByText(/Encountered pokémons/);
    expect(initialText).toBeInTheDocument();
  });
});

describe('No topo da aplicação, deve haver um conjunto fixo de links de navegação', () => {
  test('Se o primeiro link é o home e aponta para "/"', () => {
    const history = createMemoryHistory();
    const { queryAllByRole } = render(<Router history={history}><App /></Router>);
    const firstLink = queryAllByRole('link')[0];
    expect(firstLink.text).toBe('Home');
    expect(firstLink.pathname).toBe('/');
  });

  test('Se o segundo link é o About e aponta para "/about"', () => {
    const history = createMemoryHistory();
    const { queryAllByRole } = render(<Router history={history}><App /></Router>);
    const firstLink = queryAllByRole('link')[1];
    expect(firstLink.text).toBe('About');
    expect(firstLink.pathname).toBe('/about');
  });

  test('Se o terceiro link é o Favorite e aponta para "/favorites"', () => {
    const history = createMemoryHistory();
    const { queryAllByRole } = render(<Router history={history}><App /></Router>);
    const firstLink = queryAllByRole('link')[2];
    console.log(firstLink.text);
    expect(firstLink.text).toBe('Favorite Pokémons');
    expect(firstLink.pathname).toBe('/favorites');
  });
});
