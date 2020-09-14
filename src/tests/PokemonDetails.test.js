import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

test('Testando o More Details', () => {
  const { getByText, getAllByAltText, getByLabelText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  fireEvent.click(getByText('More details'));
  expect(getByText('Pikachu Details')).toBeInTheDocument();
  expect(getByText(/summary/i)).toBeInTheDocument();
  expect(getByText(/summary/i).innerHTML).toBe(' Summary ');
  expect(getByText(/summary/i).tagName).toBe('H2');
  expect(getByText(/game locations of pikachu/i)).toBeInTheDocument();
  expect(getByText(/game locations of pikachu/i).innerHTML).toBe(
    'Game Locations of Pikachu',
  );
  expect(getByText(/game locations of pikachu/i).tagName).toBe('H2');
  expect(
    getByText(
      /This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i,
    ),
  ).toBeInTheDocument();
  expect(getAllByAltText(/Pikachu location/i)[0].src).toBe(
    'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
  );
  expect(getAllByAltText(/Pikachu location/i)[1].src).toBe(
    'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
  );
  expect(getByText(/kanto viridian forest/i)).toBeInTheDocument();
  expect(getByText(/kanto power plant/i)).toBeInTheDocument();
  expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument;
});
