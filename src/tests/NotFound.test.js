import React from 'react';
import { cleanup, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

afterEach(cleanup);

test('A página deve conter um heading h2 com o texto Page requested not found', () => {
  const { getByText, getByRole } = render(<NotFound />);
  expect(getByText('Page requested not found')).toBeInTheDocument();
  expect(getByRole('heading')).toBeInTheDocument();
  expect(getByText('Page requested not found').tagName).toBe('H2');
});

test('A página deve conter um heading h2 com o texto Page requested not found', () => {
  const { container } = render(<NotFound />);
  expect(container.querySelector('img')).toBeInTheDocument();
  expect(container.querySelector('img').src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
