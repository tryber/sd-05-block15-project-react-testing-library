import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../components/NotFound';

describe('Testes do arquivo NotFound.js', () => {
  afterEach(cleanup);
  test('testes', () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const heading = getByText(/Page requested not found/);
    expect(heading).toBeInTheDocument();

    const image = getAllByRole('img');
    expect(image[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
