import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('', () => {
  const { getByText, getAllByRole } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  expect(getByText('Page requested not found')).toBeInTheDocument();
  const imagem = getAllByRole('img')[1];
  expect(imagem.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
