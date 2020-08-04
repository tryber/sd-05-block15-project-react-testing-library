import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import App from '../App.js';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
  const { getByTestId } = render(<MemoryRouter><App /></MemoryRouter>);
  // const textNext = getByText(/Próximo pokémon/i);
  // expect(textNext).toBeInTheDocument();
  const btnNext = getByTestId('next-pokemon');
  expect(btnNext).toBeInTheDocument();

  // fireEvent.click
});