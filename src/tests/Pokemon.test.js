import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../tests/renderWithRouter';
import Pokemon from '../components/Pokemon';


const teste = {
  id: 78,
  name: 'Rapidash',
  type: 'Fire',
  averageWeight: {
    value: '95.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/5/58/Spr_5b_078.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Route 28',
      map: 'https://cdn.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png',
    },
    {
      location: 'Johto Mount Silver',
      map: 'https://cdn.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png',
    },
  ],
  summary: 'At full gallop, its four hooves barely touch the ground because it moves so incredibly fast.',
};

const { id, name, type, averageWeight: { value, measurementUnit }, image } = teste;

describe('testes no arquivo do Pokemon.js', () => {
  afterEach(cleanup);
  test('referentes ao card pokemon', () => {
    const { getByText, getByRole, history } = renderWithRouter(<Pokemon
      pokemon={teste} isFavorite={false}
    />);
    const pokemonName = getByText(name);
    //  O nome correto do pokémon deve aparecer na tela
    expect(pokemonName).toBeInTheDocument();
    const weightText = getByText(`Average weight:${value}${measurementUnit}`);
    expect(weightText).toBeInTheDocument();
    // O peso médio do pokémon deve ser exibido com um texto no formato
    // Average weight: <value> <measurementUnit>, onde <value> e
    // <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida;
    const img = getByRole('img');
    expect(img.src).toBe(image);
    expect(img.alt).toBe(`${name} sprite`);
    const getLink = getByText(/More details/i);
    const pathLink = getLink.pathname;
    expect(pathLink).toBe(`/pokemons/${id}`);
    fireEvent.click(getLink);
    expect(history.location.pathname).toBe(pathLink);

    //  nao está no enunciado, mas a mutacao exige que cheque:
    const pokemonType = getByText(type);
    expect(pokemonType).toBeInTheDocument();
  });
  it('Testes em um pokemon favoritado', () => {
    const { getAllByRole } = renderWithRouter(<Pokemon pokemon={teste} isFavorite />);
    const getImages = getAllByRole('img');
    const separado = getImages[1].src.split('/');
    expect(separado[3]).toBe('star-icon.svg');
    expect(getImages[1].alt).toBe(`${name} is marked as favorite`);
  });
});
