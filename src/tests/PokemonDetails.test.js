/* import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App  from '../components/PokemonDetails';

const pokemonTest = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
}
test('Render Pokemon Details', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App 
        isPokemonFavoriteById={{25:true}}
        match={{params: {id: '2'}}}
        onUpdateFavoritePokemons={()=>true}
        pokemons={[pokemonTest]}
      />
    </MemoryRouter>
  );
  /* const locationPoke = getByText(/Game Locations of [.]+/i);
  expect(locationPoke).toBeInTheDocument();
}); */