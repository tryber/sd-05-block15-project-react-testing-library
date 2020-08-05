import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('renders about page', () => {
  afterEach(cleanup);
  test('navigating from home to about', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const paginaInicial = getByText(/about/i);
    expect(paginaInicial).toBeInTheDocument();

    fireEvent.click(getByText(/about/i));

    const heading = getByText(/about pokédex/i);
    expect(heading).toBeInTheDocument();

    const p1 = getByText(/This application simulates a Pokédex, a digital encliclopedia containing all Pokémons/);
    expect(p1).toBeInTheDocument();

    const p2 = getByText(/One can filter Pokémons by type, and see more details for each one of them/);
    expect(p2).toBeInTheDocument();

    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
