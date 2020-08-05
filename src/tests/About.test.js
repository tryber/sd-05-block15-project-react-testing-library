import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

test('page has a h2 with text About Pokedex', () => {
  const { getByText } = render(<About />);

  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('it has the correct Pokemon img', () => {
  const { getByAltText } = render(<About />);

  const imgPokedex = getByAltText('Pokédex');
  console.log(imgPokedex);
  expect(imgPokedex).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
