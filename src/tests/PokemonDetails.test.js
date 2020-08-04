import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Deve conter mais informações sobre apenas o pokémon selecionado', () => {
  test('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon', () => {
    const history = createMemoryHistory();
    history.push('/pokemons/25');
    const { getByTestId } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');
  });

  test('O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon', () => {
    const history = createMemoryHistory();
    history.push('/pokemons/25');
    const { queryByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    const moreDetails = queryByText(/More details/);
    expect(moreDetails).not.toBeInTheDocument();
  });
});
