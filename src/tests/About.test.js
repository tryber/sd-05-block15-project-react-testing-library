import React from 'react';
import { render, cleanup } from '@testing-library/react';
import About from '../components/About';

afterEach(cleanup);

describe('A página "About" deve exibir informações sobre a Pokédex', () => {
  it('A página deve conter um header h2 com o texto About Pokédex', () => {
    const { queryByText } = render(<About />);

    expect(queryByText('About Pokédex').tagName).toBe('H2');
    expect(queryByText('About Pokédex')).toBeInTheDocument();
  });

  it('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText, container } = render(<About />);
    const paragraphs = container.querySelectorAll('p');

    expect(paragraphs.length).toBe(2);
    expect(getByText(/This application simulates a Pokédex, a digital encliclopedia containing all Pokémons/i)).toBeInTheDocument();
    expect(getByText(/One can filter Pokémons by type, and see more details for each one of them/i)).toBeInTheDocument();
  });

  it('A página deve conter a imagem específica de uma Pokédex', () => {
    const { getByAltText, queryByRole } = render(<About />);

    expect(queryByRole('img')).toBeInTheDocument();
    expect(getByAltText('Pokédex').tagName).toMatch(/img/i);
    expect(getByAltText('Pokédex')).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
