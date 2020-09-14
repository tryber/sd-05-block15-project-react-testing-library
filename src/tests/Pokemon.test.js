import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);
test('Deve ser retornado um card com as informações de determinado pokémon', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/pikachu/i)).toBeInTheDocument();
  expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
  expect(getByTestId('pokemonType').textContent).toBe('Electric');
  expect(getByTestId('pokemon-weight').textContent).toBe(
    'Average weight:6.0kg',
  );
  fireEvent.click(getByText(/More details/i));
  expect(getByText(/Pikachu Details/i)).toBeInTheDocument();
});

test('O nome correto do pokémon deve aparecer na tela', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/pikachu/i)).toBeInTheDocument();
  fireEvent.click(getByText(/More details/i));
  expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
});

test('O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>, onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/pikachu/i)).toBeInTheDocument();
  fireEvent.click(getByText(/More details/i));
  expect(getByTestId('pokemon-weight').textContent).toBe(
    'Average weight:6.0kg',
  );
});

test('A imagem deve conter um atributo src com a URL da imagem do pokémon. A imagem deverá ter também um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon', () => {
  const { queryByAltText, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText(/More details/i));
  expect(queryByAltText('Pikachu sprite')).toBeInTheDocument();
  expect(queryByAltText('Pikachu sprite').src).toBe(
    'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  );
});

test('O pokémon exibido na Pokédex deve conter um link de navegação para exibir detalhes deste pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('More details').href).toBe('http://localhost/pokemons/25');
});

describe('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
  test('O ícone deve ser uma imagem, com o atributo src igual "/star-icon.svg" e o alt deve ser igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do pokémon cujos detalhes estão sendo exibidos.', () => {
    const { getByText, getByTestId, getByLabelText, getByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    fireEvent.click(getByText(/More details/i));
    expect(getByTestId('pokemon-name').textContent).toBe('Pikachu');
    expect(getByText(/Pikachu Details/i)).toBeInTheDocument();
    expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
    fireEvent.click(getByLabelText('Pokémon favoritado?'));
    expect(getByAltText('Pikachu is marked as favorite').src).toBe(
      'http://localhost/star-icon.svg',
    );
  });
});
