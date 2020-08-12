import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('Deve ser retornado um card com as informações de determinado pokémon, O nome correto do pokémon deve aparecer na tela, peso médio do pokémon', () => {
  const { getByTestId, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemonName = getByTestId(/pokemon-name/i);
  expect(pokemonName).toBeInTheDocument();
  expect(pokemonName.innerHTML).toBe('Pikachu');

  const pokemonType = getByTestId(/pokemonType/i);
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonType.innerHTML).toBe('Electric');

  const pokemonWeight = getByTestId(/pokemon-weight/i);
  expect(pokemonWeight).toBeInTheDocument();
  expect(pokemonWeight.innerHTML).toBe('Average weight:6.0kg');

  const textoPeso = getByText(/Average weight:6.0kg/i);
  expect(textoPeso).toBeInTheDocument();
});

test('A imagem deve conter um atributo src, o pokémon exibido na Pokédex deve conter um link de navegação', () => {
  const { queryByRole, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const verificaImg = queryByRole('img');
  expect(verificaImg).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(verificaImg).toHaveAttribute('alt', 'Pikachu sprite');

  const moreDetails = getByText(/More details/i);
  expect(moreDetails).toHaveAttribute('href', '/pokemons/25');

  fireEvent.click(moreDetails);
  const pikachuDetails = getByText(/Pikachu Details/i);
  expect(pikachuDetails).toBeInTheDocument();
});

test('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
  const { getByAltText, getByText, getByLabelText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const moreDetails = getByText(/More details/i);
  fireEvent.click(moreDetails);
  const favoritos = getByLabelText('Pokémon favoritado?');
  fireEvent.click(favoritos);
  const iconeEstrela = getByAltText('Pikachu is marked as favorite');
  expect(iconeEstrela).toBeInTheDocument();
  expect(iconeEstrela).toHaveAttribute('src', '/star-icon.svg');
});
