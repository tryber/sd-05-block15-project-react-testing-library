// Luca Castro explicou sobre o Details
/* import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

test('Testar nome do pokemon', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const nome = createMemoryHistory();
  nome.push('/pokemons/25');

  expect(getByText(/pikachu details/i)).toBeInTheDocument();
});

test('Summary, h2', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const sumario = getAllByRole('heading')[2];
    expect(sumario.tagName).toBe('h2')
    expect(sumario.innerHTML).toBe('Summary');
  });
*/
