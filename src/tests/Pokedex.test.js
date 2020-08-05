import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

test('it should show the next pokemon with click on next-pokemon button', () => {
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

// test('it should contain filter buttons', () => {

// });
