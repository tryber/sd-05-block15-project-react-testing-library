import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import App from '../App';
import About from '../components/About';

afterEach(cleanup);

test('A página deve conter um heading h2 com o texto About Pokédex', () => {
  const { queryByText, container, getByText, queryByRole, getByAltText } = render(<About />);
  const aboutPokedexTag = queryByText('About Pokédex');

  const containerParagraph = container.querySelectorAll('p');

  expect(aboutPokedexTag).toBeInTheDocument();

  expect(container.querySelector('h2')).toBeInTheDocument();
  expect(aboutPokedexTag.tagName).toBe('H2');

  expect(containerParagraph.length).toBe(2);

  expect(getByText(/This application simulates a Pokédex, a digital encliclopedia containing all Pokémons/i)).toBeInTheDocument();

  expect(getByText(/One can filter Pokémons by type, and see more details for each one of them/i)).toBeInTheDocument();

  expect(queryByRole('img')).toBeInTheDocument();

  expect((queryByRole('img'))).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');

  expect(getByAltText('Pokédex')).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');

  expect(getByAltText('Pokédex').tagName).toMatch(/img/i);
})

// A página "About" deve exibir informações sobre a Pokédex

// A página deve conter um heading h2 com o texto About Pokédex; OK

// A página deve conter dois parágrafos com texto sobre a Pokédex; OK

// A página deve conter a seguinte imagem de uma Pokédex: https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png. OK