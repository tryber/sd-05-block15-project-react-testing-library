import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('Testando conjunto de links de verificação', () => {
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
  expect(heading).toBeInTheDocument();
  expect(favorito).toBeInTheDocument();
  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
});
