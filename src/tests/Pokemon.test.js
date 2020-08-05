import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

afterEach(cleanup);

// Deve ser retornado um card com as informações de determinado pokémon
test('O nome e o tipo correto do pokémon deve aparecer na tela', () => {
  const { getByText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/pikachu/i)).toBeInTheDocument();
  expect(getAllByText(/electric/i)).toHaveLength(2);
});

test('O peso médio do pokémon deve ser exibido...etc', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByTestId('pokemon-weight').innerHTML).toBe('Average weight:6.0kg');
});

test('A imagem deve conter um atributo src com a URL da imagem do pokémon, e também verificando o alt', () => {
  const { getByRole, getByAltText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByRole('img').src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(getByAltText('Pikachu sprite')).toBeInTheDocument();
});

test('O pokémon exibido na Pokédex deve conter um link de navegação', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemonLink = getByText(/more details/i);
  expect(pokemonLink).toHaveAttribute('href', '/pokemons/25');
});

test('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
  const { getByText, getByAltText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(getByText(/more details/i));
  fireEvent.click(getByText(/pokémon favoritado/i));
  const favoritePokemon = getByAltText(/Pikachu is marked as favorite/i);
  expect(favoritePokemon).toBeInTheDocument();
  expect(favoritePokemon.src).toBe('http://localhost/star-icon.svg');
});
