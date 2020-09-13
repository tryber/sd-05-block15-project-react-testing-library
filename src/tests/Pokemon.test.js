// Plantão em dupla com a Isabel, ela tirou duvidas sobre esse projeto
import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';
import Data from '../data';

test('CARD', () => {
  const novo = Data[0];
  const history = createMemoryHistory();

  const { getByText, queryAllByRole, getByLabelText, getByTestId } = render(
    <Router history={history}>
      <App />
    </Router>,
  );

  const name = getByText('Pikachu');
  expect(name).toBeInTheDocument();
  const tipo = getByTestId('pokemonType');
  expect(tipo).toBeInTheDocument();
  const peso = getByText(
    `Average weight:${novo.averageWeight.value}${novo.averageWeight.measurementUnit}`,
  );
  expect(peso).toBeInTheDocument();
  const imgPoke = queryAllByRole('img').find((imgSrc) =>
    imgSrc.src.includes('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png'),
  );
  expect(imgPoke).toBeInTheDocument();
  expect(imgPoke.alt).toBe(`${novo.name} sprite`);
  const info = getByText('More details');
  expect(info).toBeInTheDocument();
  const linkinfo = info.href.endsWith(`/pokemons/${novo.id}`);
  expect(linkinfo).toBe(true);
  fireEvent.click(info);
  expect(history.location.pathname).toBe(`/pokemons/${novo.id}`);
  const checkbox = getByLabelText('Pokémon favoritado?');
  fireEvent.click(checkbox);
  const checkPoke = queryAllByRole('img').find((imagemSRC) =>
    imagemSRC.src.endsWith('star-icon.svg'),
  );
  expect(checkPoke).toBeInTheDocument();
  expect(checkPoke.alt).toBe(`${novo.name} is marked as favorite`);
});
