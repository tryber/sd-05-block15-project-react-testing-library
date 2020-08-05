import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Testes do arquivo PokemonDetails.js', () => {
  afterEach(cleanup);
  test('testes', () => {
    const { getByText, queryByText, getByLabelText, getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    
    const moreDetails = getByText('More details');
    expect(moreDetails).toBeInTheDocument();

    fireEvent.click(moreDetails);

    const pokemonDetails = getByText('Pikachu Details');
    expect(pokemonDetails).toBeInTheDocument();

    const link = queryByText('More details');
    expect(link).toBeNull();

    const heading = document.querySelectorAll('h2');
    expect(heading[1].innerHTML).toBe(' Summary ');

    const paragraph = document.querySelector('p');
    expect(paragraph).toBeInTheDocument();

    const locationHeading = document.querySelectorAll('h2');
    expect(locationHeading[2].innerHTML).toBe('Game Locations of Pikachu');

    const favorite = getByLabelText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();

    fireEvent.click(favorite);

    const icone = getAllByRole('img');
    expect(icone[1].src).toBe('http://localhost/star-icon.svg');
    expect(icone[1].alt).toBe('Pikachu is marked as favorite');  
  });
});
