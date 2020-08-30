import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Heading e Imagem', () => {
  const { getByText, container } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const heading = getByText('Page requested not found');
  expect(heading).toBeInTheDocument();
  expect(heading.tagName).toBe('H2');
  const imagem = container.querySelector('img');
  expect(imagem.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
