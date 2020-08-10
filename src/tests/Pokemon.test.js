import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

afterEach(cleanup);

test('Deve ser retornado um card com as informações de determinado pokémon', () => {
  const { getByTestId, getByText } = render(<MemoryRouter><App /></MemoryRouter>);
  expect(getByTestId('pokemon-name')).toBeInTheDocument();
  expect(getByTestId('pokemonType')).toBeInTheDocument();
  expect(getByTestId('pokemon-weight')).toBeInTheDocument();
  fireEvent.click(getByText('Psychic'));
  expect(getByTestId('pokemon-name')).toBeInTheDocument();
  expect(getByTestId('pokemonType')).toBeInTheDocument();
  expect(getByTestId('pokemon-weight')).toBeInTheDocument();
});

test('O nome e tipo corretos do pokémon deve aparecer na tela', () => {
  const { getByText, getAllByText } = render(<MemoryRouter><App /></MemoryRouter>);
  fireEvent.click(getByText('Normal'));
  expect(getByText('Snorlax')).toBeInTheDocument();
  expect(getAllByText('Normal')).toHaveLength(2);
  fireEvent.click(getByText('Bug'));
  expect(getByText('Caterpie')).toBeInTheDocument();
  expect(getAllByText('Bug')).toHaveLength(2);
});

test('O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>, onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida', () => {
  const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
  fireEvent.click(getByText('Poison'));
  expect(getByText('Average weight:6.9kg')).toBeInTheDocument();
  fireEvent.click(getByText('Dragon'));
  expect(getByText('Average weight:16.5kg')).toBeInTheDocument();
});

test('A imagem deve conter um atributo src com a URL da imagem do pokémon. A imagem deverá ter também um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon', () => {
  const { getByText, getByRole } = render(<MemoryRouter><App /></MemoryRouter>);
  fireEvent.click(getByText('Fire'));
  expect(getByRole('img')).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  expect(getByRole('img')).toHaveAttribute('alt', 'Charmander sprite');
  fireEvent.click(getByText('Electric'));
  expect(getByRole('img')).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(getByRole('img')).toHaveAttribute('alt', 'Pikachu sprite');
});

test('O pokémon exibido na Pokédex deve conter um link de navegação para exibir detalhes deste pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido', () => {
  const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
  fireEvent.click(getByText('Fire'));
  expect(getByText(/more details/i)).toBeInTheDocument();
  expect(getByText(/more details/i)).toHaveAttribute('href', '/pokemons/4');
  fireEvent.click(getByText('Normal'));
  expect(getByText(/more details/i)).toBeInTheDocument();
  expect(getByText(/more details/i)).toHaveAttribute('href', '/pokemons/143');
});

test('Ao clicar no link de navegação do pokémon, a aplicação deve ser redirecionada para a página de detalhes de pokémon. A URL exibida no navegador deve mudar para /pokemon/<id>, onde <id> é o id do pokémon cujos detalhes se deseja ver', () => {
  const { getByText, getAllByRole } = render(<MemoryRouter><App /></MemoryRouter>);
  fireEvent.click(getByText('Fire'));
  expect(getByText(/more details/i)).toBeInTheDocument();
  expect(getAllByRole('link')[3]).toHaveAttribute('href', '/pokemons/4');
  fireEvent.click(getByText(/more details/i));
  expect(getByText(/charmander details/i)).toBeInTheDocument();
});

describe('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
  test('O ícone deve ser uma imagem, com o atributo src igual "/star-icon.svg"', () => {
    const { getByText, getAllByRole } = render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.click(getByText(/more details/i));
    fireEvent.click(getByText(/pokémon favoritado/i));
    expect(getAllByRole('img')[1]).toHaveAttribute('src', '/star-icon.svg');
    fireEvent.click(getByText('Home'));
    expect(getAllByRole('img')[1]).toHaveAttribute('src', '/star-icon.svg');
  });

  test('A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do pokémon cujos detalhes estão sendo exibidos', () => {
    const { getByText, getByAltText } = render(<MemoryRouter><App /></MemoryRouter>);
    expect(getByAltText(/Pikachu is marked as favorite/i)).toBeInTheDocument();
    fireEvent.click(getByText('Home'));
    expect(getByAltText(/Pikachu is marked as favorite/i)).toBeInTheDocument();
  });
});
