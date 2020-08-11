import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
import data from '../data';

describe('Teste do componente PokemonDetails', () => {
  it('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon.', () => {
    const poke = data.find(Boolean);
    const { name, id } = poke;
    const history = createMemoryHistory();
    history.push(`/pokemons/${id}`);
    const { queryByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    const detailContainer = queryByText(`${name} Details`);
    expect(detailContainer.tagName).toBe('H2');
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const poke = data.find(Boolean);
    const { id } = poke;
    const history = createMemoryHistory();
    history.push(`/pokemons/${id}`);
    const { queryByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    const detailContainer = queryByText('Summary');
    console.log(detailContainer.innerHTML);
    expect(detailContainer.tagName).toBe('H2');
    expect(detailContainer).toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Game Locations of <name>, , onde <name> é o nome do pokémon exibido;', () => {
    const poke = data.find(Boolean);
    const { name, id } = poke;
    const history = createMemoryHistory();
    history.push(`/pokemons/${id}`);
    const { queryByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    const detailContainer = queryByText(`Game Locations of ${name}`);
    expect(detailContainer.tagName).toBe('H2');
  });

  it('A página de detalhes deve exibir uma seção com os mapas com as localizações do pokémon', () => {
    const poke = data.find(Boolean);
    const { name, id, foundAt } = poke;
    const history = createMemoryHistory();
    history.push(`/pokemons/${id}`);
    const { queryByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    foundAt.forEach(({ location, map }) => {
      const whereToFind = queryByText(`${location}`);
      expect(whereToFind).toBeInTheDocument();
      const { src, alt } = whereToFind.parentElement.previousElementSibling;
      expect(src).toBe(map);
      expect(alt).toBe(`${name} location`);
    });
  });

  it('A página de detalhes deve permitir favoritar um pokemon', () => {
    const poke = data.find(Boolean);
    const { id } = poke;
    const history = createMemoryHistory();
    history.push(`/pokemons/${id}`);
    const { queryByLabelText, getAllByRole } = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    const label = queryByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
    fireEvent.click(label);
    const pokeImage = getAllByRole('img')
      .find(({ src }) => src.endsWith('/star-icon.svg'));
    const { name } = data.find(Boolean);
    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage.alt).toBe(`${name} is marked as favorite`);
    fireEvent.click(label);
    expect(pokeImage).not.toBeInTheDocument();
  });
});
