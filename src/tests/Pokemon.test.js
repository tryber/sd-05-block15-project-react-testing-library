import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('Testing pokemon component', () => {
  const { getByText, getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const all = getByText('All');
  fireEvent.click(all);
  expect(getAllByText('Electric').length).toBe(2);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
  expect(getByText('Próximo pokémon')).toBeInTheDocument();
  expect(getByText('Pikachu')).toBeInTheDocument();
  expect(getByText('Average weight:6.0kg')).toBeInTheDocument();
  const moreDetails = getByText('More details');
  fireEvent.click(moreDetails);
});
