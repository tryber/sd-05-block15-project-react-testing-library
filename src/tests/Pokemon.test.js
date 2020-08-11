import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
import Pokemon from '../components/Pokemon';
import data from '../data';


describe('Testes do arquivo Pokemon', () => {
  it('Dever ter um card com as informações do Pokemon na tela', () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const pokeCard = container.querySelector('.pokemon');
    expect(pokeCard).toBeInTheDocument();
  });

  it('O nome correto do pokémon deve aparecer na tela', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <Pokemon pokemon={data.find(Boolean)} isFavorite={false} />
      </MemoryRouter>,
    );
    const pokeAttribute = queryByTestId('pokemon-name').innerHTML;
    expect(pokeAttribute).toBe(data.find(Boolean).name);
  });

  it('O nome tipo do pokémon deve aparecer na tela', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <Pokemon pokemon={data.find(Boolean)} isFavorite={false} />
      </MemoryRouter>,
    );
    const pokeAttribute = queryByTestId('pokemonType').innerHTML;
    expect(pokeAttribute).toBe(data.find(Boolean).type);
  });

  it('O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value>', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <Pokemon pokemon={data.find(Boolean)} isFavorite={false} />
      </MemoryRouter>,
    );

    const { averageWeight: { value, measurementUnit } } = data.find(Boolean);
    const pokeWeigth = `Average weight:${value}${measurementUnit}`;
    const pokeAttribute = queryByTestId('pokemon-weight').innerHTML;
    expect(pokeAttribute).toBe(pokeWeigth);
  });

  describe('Testando a imagem do pokemon', () => {
    it('Imagem deve conter um atributo src com a url da imagem do Pokémon e uma alt com o texto <name> sprite.', () => {
      const { getByRole } = render(
        <MemoryRouter>
          <Pokemon pokemon={data.find(Boolean)} isFavorite={false} />
        </MemoryRouter>,
      );

      const { image, name } = data.find(Boolean);
      const pokeImage = getByRole('img');
      expect(pokeImage.src).toBe(image);
      expect(pokeImage.alt).toBe(`${name} sprite`);
    });
  });

  it('O pokémon exibido na Pokédex deve conter um link de navegação para exibir detalhes deste pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido.', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Pokemon pokemon={data.find(Boolean)} isFavorite={false} />
      </MemoryRouter>,
    );

    const { id } = data.find(Boolean);
    const detailLink = getByRole('link');
    const { href } = detailLink;
    expect(href.endsWith(`/pokemons/${id}`)).toBe(true);
  });

  it('Ao clicar no link de navegação do pokémon, a aplicação deve ser redirecionada para a página de detalhes de pokémon. A URL exibida no navegador deve mudar para /pokemon/<id>, onde <id> é o id do pokémon cujos detalhes se deseja ver;', () => {
    const { id } = data.find(Boolean);
    const history = createMemoryHistory();
    // history.push(`/pokemons/${id}`);
    const { getAllByRole } = render(
      <Router history={history}>
        {/* <Pokemon pokemon={data.find(Boolean)} isFavorite={false} /> */}
        <App />
      </Router>,
    );
    const detailLink = getAllByRole('link')[3];
    fireEvent.click(detailLink);
    console.log(history.location.pathname);
    expect(history.location.pathname).toBe(`pokemons/${id}`);
  });

  it(`Pokémons favoritados devem exibir um ícone de uma estrela.
    A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do pokémon cujos detalhes estão sendo exibidos.`, () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <Pokemon pokemon={data.find(Boolean)} isFavorite />
      </MemoryRouter>,
    );
    const pokeImage = getAllByRole('img')
      .find(({ src }) => src.endsWith('/star-icon.svg'));
    const { name } = data.find(Boolean);
    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage.alt).toBe(`${name} is marked as favorite`);
  });
});
