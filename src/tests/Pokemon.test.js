import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

test('Ver o card se tem as coisas', () => {
  const { getByText, getByTestId, getByAltText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const source = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
  expect(getByText('Pikachu')).toBeInTheDocument();
  expect(getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
  expect(getByTestId('pokemon-weight').innerHTML).toBe('Average weight:6.0kg');
  expect(getByAltText('Pikachu sprite')).toBeInTheDocument();
  expect(getByAltText('Pikachu sprite').src).toBe(source);
  expect(getByText('More details').href).toBe('http://localhost/pokemons/25');
});

test('Ver as coisas do More Details', () => {
  const { getByText, getByLabelText, getByAltText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('More details').href).toBe('http://localhost/pokemons/25');
  fireEvent.click(getByText('More details'));
  fireEvent.click(getByLabelText('Pokémon favoritado?'));
  expect(getByAltText('Pikachu is marked as favorite').src).toBe(
    'http://localhost/star-icon.svg',
  );
});
