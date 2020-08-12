import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testes do arquivo NotFound.js', () => {
  afterEach(cleanup);
  test('4.1 - A página deve conter um heading h2 com o texto Page requested not found', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const verificaH2 = getByText(/Page requested not found/i);
    expect(verificaH2).toBeInTheDocument();
  });

  test('4.2 - A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const verificaTagImg = getAllByRole('img')[1];
    expect(verificaTagImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
