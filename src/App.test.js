import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from './App';

test('testando HOME', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const home = getByText(/Home/i);
  expect(home).toBeInTheDocument();
  const about = getByText(/About/i);
  expect(about).toBeInTheDocument();  
  const favorite = getByText(/Favorite/i);
  expect(favorite).toBeInTheDocument();
});
