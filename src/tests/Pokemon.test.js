import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render } from ' @testing-library/react';
import App from '../App';

afterEach(cleanup);
describe('Deve ser retornado um card com as informações de determiado pokémon', () => {
  test('O nome e o tipo correto do pokémon deve aparecer na tela', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByText(/pikachu/i)).toBeInTheDocument();
    expect(getAllByText(/electric/i)).toHaveLength(2);
  });
});
