import React from 'react';
import { fireEvent, cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

afterEach(cleanup);

describe('Deve ser retornado um card com as informações de determinado pokémon;', () => {
  test('O nome e o tipo correto do pokémon deve aparecer na tela', () => {
    const { getByText, getAllByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getAllByText(/electric/i)).toHaveLength(2);
    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });
});

test('O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>, onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida;', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByTestId('pokemon-weight').innerHTML).toBe('Average weight:6.0kg');
});

test('A imagem deve conter um atributo src com a URL da imagem do pokémon. A imagem deverá ter também um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;', () => {
  const { getByRole, getByAltText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByRole('img').src).toBe(
    'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  );
  expect(getByAltText('Pikachu sprite')).toBeInTheDocument();
});

test('O pokémon exibido na Pokédex deve conter um link de navegação para exibir detalhes deste pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido;', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const plink = getByText(/more details/i);
  expect(plink).toHaveAttribute('href', '/pokemons/25');
});

test('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
  const { getByAltText, getByText } = render(
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
