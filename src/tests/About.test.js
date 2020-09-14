import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import About from '../components/About';
import App from '../App';

afterEach(cleanup);

describe('Testes do arquivo About.js', () => {
  test('A página "About" deve exibir informações sobre a Pokédex', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    fireEvent.click(getByText(/about/i));
    expect(history.location.pathname).toBe('/about');
  });

  test('A página deve conter um heading h2 com o texto About Pokédex', () => {
    const { getByText } = render(<About />);
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = render(<About />);
    const p = container.querySelectorAll('p');
    expect(p.length).toBe(2);
  });

  test('A página deve conter a imagem de uma Pokédex', () => {
    const { getByRole } = render(<About />);
    const img = getByRole('img');
    expect(img.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
