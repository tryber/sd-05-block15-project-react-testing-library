import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<MemoryRouter history={history}>{component}</MemoryRouter>),
    history,
  };
};

describe('2. Testes do arquivo About.js', () => {
  test('2.1 - A página "About" deve exibir informações sobre a Pokédex', () => {
    const { getByTestId } = renderWithRouter(<About />);

    const infoPokedex = getByTestId('custom-element');
    expect(infoPokedex).toBeInTheDocument();
  });

  test('2.2 - A página deve conter um heading h2 com o texto About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const veriTitulo = getByText(/About Pokédex/i);
    expect(veriTitulo).toBeInTheDocument();
  });

  test('2.3 - A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);

    const veriTagP = container.querySelectorAll('p');
    expect(veriTagP).toHaveLength(2);
  });

  test('2.4 - A página deve conter a seguinte imagem de uma Pokédex', () => {
    const { queryByRole } = renderWithRouter(<About />);

    const altImg = queryByRole('img');
    expect(altImg).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
