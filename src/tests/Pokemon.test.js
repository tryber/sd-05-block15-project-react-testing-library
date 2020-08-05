import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

afterEach(cleanup);

describe('Deve ser retornado um card com as informações de determinado pokémon', () => {
  it('O nome correto do pokémon deve aparecer na tela', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getByTestId('pokemon-name').innerHTML).toEqual('Pikachu');
    expect(getByTestId('pokemonType').innerHTML).toEqual('Electric');
  });

  it('O peso médio do pokémon deve ser exibido com um texto', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getByTestId('pokemon-weight').innerHTML).toBe('Average weight:6.0kg');
  });

  it('A imagem deve conter um atributo alt e src com a URL da imagem do pokémon', () => {
    const { getByRole, getByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getByRole('img')).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(getByAltText('Pikachu sprite')).toBeInTheDocument();
  });

  it('O pokémon exibido na Pokédex deve conter um link de navegação para exibir detalhes deste pokémon', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('More details').href).toBe('http://localhost/pokemons/25');
  });
});
