import React from 'react';
import { cleanup, render } from '@testing-library/react';
import About from '../components/About';

afterEach(cleanup);

describe('A página "About" deve exibir informações sobre a Pokédex', () => {
  test('A página deve conter um heading h2 com o texto About Pokédex', () => {
    const { queryByText } = render(<About />);

    expect(queryByText('About Pokédex')).toBeInTheDocument();
    expect(queryByText('About Pokédex').tagName).toBe('H2');
  });

  test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = render(<About />);

    const containerParagraph = container.querySelectorAll('p');
    expect(containerParagraph).toHaveLength(2);
  });

  test('A página deve conter a seguinte imagem de uma Pokédex', () => {
    const { queryByRole } = render(<About />);

    expect((queryByRole('img'))).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
