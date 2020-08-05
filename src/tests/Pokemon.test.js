import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('Testing pokemon component', () => {
  const { getByText, getAllByText, container } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const all = getByText('All');
  fireEvent.click(all);
  expect(getAllByText('Electric').length).toBe(2);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
  expect(getByText('Próximo pokémon')).toBeInTheDocument();
  expect(getByText('Pikachu')).toBeInTheDocument();
  expect(getByText('Average weight:6.0kg')).toBeInTheDocument();
  const link = container.querySelectorAll('a')[3];
  const imagem = container.querySelector('img');
  expect(link.href).toBe('http://localhost/pokemons/25');
  expect(imagem.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(imagem.alt).toBe('Pikachu sprite');
  const moreDetails = getByText('More details');
  fireEvent.click(moreDetails);
  const favorite = getByText('Pokémon favoritado?');
  fireEvent.click(favorite);
  const star = container.querySelectorAll('img')[1];
  expect(star.src).toBe('http://localhost/star-icon.svg');
  expect(star.alt).toBe('Pikachu is marked as favorite');
});
