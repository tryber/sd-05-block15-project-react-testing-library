import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
import About from '../components/About';

const img = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
describe('A página About deve exibir informações sobre a Pokédex', () => {
  test('Verificando o pathname', () => {
    const history = createMemoryHistory();
    const { queryAllByRole } = render(<Router history={history}><App /></Router>);
    const linkAbout = queryAllByRole('link')[1];
    fireEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('A página deve conter um heading `h2` com o texto `About Pokédex`.', () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  test('A página deve conter dois parágrafos com texto sobre a Pokedéx', () => {
    const { container } = render(<About />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  it('A página deve conter uma imagem de uma Pokedéx', () => {
    const { getByRole } = render(<About />);
    const pokdedexImg = getByRole('img');
    expect(pokdedexImg).toBeInTheDocument();
    expect(pokdedexImg.src).toBe(img);
  });
});
