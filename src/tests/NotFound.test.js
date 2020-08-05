import React from 'react';
import { cleanup, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

afterEach(cleanup);

test('Elementos no componente NotFound', () => {
  const { queryByText, container } = render(<NotFound />);
  const notFound = queryByText('Page requested not found 😭');
  expect(notFound.tagName).toBe('H2');
  expect(container.querySelector('img')).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
