// Explicação do Luca Castro e do Mitchell
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('Card', () => {
  const { getByTestId, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const nome = getByTestId(/pokemon-name/i);
  expect(nome).toBeInTheDocument();
  expect(nome.innerHTML).toBe('Pikachu');

  const tipo = getByTestId(/pokemonType/i);
  expect(tipo).toBeInTheDocument();
  expect(tipo.innerHTML).toBe('Electric');

  const peso = getByTestId(/pokemon-weight/i);
  expect(peso).toBeInTheDocument();
  expect(peso.innerHTML).toBe('Average weight:6.0kg');

  const textoPeso = getByText(/Average weight:6.0kg/i);
  expect(textoPeso).toBeInTheDocument();
});

test('Atributo src', () => {
  const { queryByRole, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const verificaImg = queryByRole('img');
  expect(verificaImg).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(verificaImg).toHaveAttribute('alt', 'Pikachu sprite');

  const more = getByText(/More details/i);
  expect(more).toHaveAttribute('href', '/pokemons/25');

  fireEvent.click(more);
  const detalhe = getByText(/Pikachu Details/i);
  expect(detalhe).toBeInTheDocument();
});

test('Pokémons favoritados', () => {
  const { getByAllText, getByText, getByLabelText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const moreDetails = getByText(/More details/i);
  fireEvent.click(moreDetails);

  const favoritados = getByLabelText('Pokémon favoritado?');
  fireEvent.click(favoritados);
  const star = getByAllText('Pikachu is marked as favorite');
  expect(star).toBeInTheDocument();
  expect(star).toHaveAttribute('src', '/star-icon.svg');
});
