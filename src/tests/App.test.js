import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('Tentando conjunto de links de verificação', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const heading = getByText(/Pokédex/i);
  const favorito = getByText(/Favorite Pokémons/i);
  const home = getByText(/Home/i);
  const about = getByText(/About/i);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
  expect(getByText(heading)).toBeInTheDocument();
  expect(getByText(favorito)).toBeInTheDocument();
  expect(getByText(home)).toBeInTheDocument();
  expect(getByText(about)).toBeInTheDocument();
});
