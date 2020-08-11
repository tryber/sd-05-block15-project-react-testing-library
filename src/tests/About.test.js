 
import React from 'react';
import renderRouter from '../services/render';
import { About } from '../components';

describe('test all |About', () => {
  test('Verify if has h2 heading', () => {
    const { getByRole } = renderRouter(<About />);
    const H2tag = getByRole('heading');
    expect(H2tag).toHaveTextContent('About Pokédex');
  });

  test('verify if has 2 paragh', () => {
    const { container } = renderRouter(<About />);
    const P = container.querySelectorAll('p');
    expect(P.length).toBe(2);
  });

  test('verify if has img', () => {
    const { getByRole } = renderRouter(<About />);
    const Img = getByRole('img');
    expect(Img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});