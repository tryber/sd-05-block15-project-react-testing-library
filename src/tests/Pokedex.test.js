import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, getByText } from '@testing-library/react';
import App from '../App';

test('must render a button to load next pokemon', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  const prevUrl = getByText('More details').getAttribute('href');
  expect(getByText('Próximo pokémon'));
  fireEvent.click(getByText('Próximo pokémon'));
  expect(getByText('More details').getAttribute('href')).not.toEqual(prevUrl);
});

test('must show one pokemon at a time', () => {
  const { getAllByText, getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getAllByText('More details').length).toBe(1);
  fireEvent.click(getByText('Próximo pokémon'));
  expect(getAllByText('More details').length).toBe(1);
});

test('must show filter buttons', () => {
  const { getAllByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const filters = ['All', 'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  for (let i in filters) {
    let filter = filters[i];
    expect(getAllByText(filter)[0]).toBeInTheDocument();
  }
});
