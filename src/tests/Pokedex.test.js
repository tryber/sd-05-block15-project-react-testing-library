import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const pokemons = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];

  const nextButton = getByText('Próximo pokémon');

  pokemons.forEach((poke) => {
    fireEvent.click(nextButton);
    expect(getByText(poke)).toBeInTheDocument();
  });
});
