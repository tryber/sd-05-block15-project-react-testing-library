import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('about', () => {
  test('tem o texto correto e a tag correta', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    fireEvent.click(getByText(/about/i));

    const h2 = document.getElementsByTagName('h2')[0];

    expect(h2).not.toBe(undefined);

    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  test('tem 2 Ps.', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    fireEvent.click(getByText(/about/i));

    const p = document.getElementsByTagName('p').length;
    expect(p).toBe(2);
  });

  test('tem a imagem correta', () => {
    const history = createMemoryHistory();
    const { getByRole, getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    fireEvent.click(getByText(/about/i));

    expect(getByRole('img').src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
