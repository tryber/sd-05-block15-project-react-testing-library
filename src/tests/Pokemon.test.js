import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('Testing pokemon component', () => {
  const { getByText, getAllByText, getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const all = getByText('All');
  fireEvent.click(all);
  expect(getAllByText('Electric').length).toBe(2);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
  expect(getByText('Próximo pokémon')).toBeInTheDocument();
  expect(getAllByTestId('pokemon-type-button').length).toBe(7);
});
