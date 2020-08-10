import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Render NotFound component', () => {
  const { getByText } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});
test('Render image properly', () => {
  const { getByAltText } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const image = getByAltText('Pikachu crying because the page requested was not found');
  expect(image.src).not.toBe('');
});
