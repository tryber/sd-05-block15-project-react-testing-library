import React from 'react';
import { cleanup, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

afterEach(cleanup);

test('A página deve conter um heading h2 com o texto Page requested not found', () => {
  const { getByText } = render(<NotFound />);
  const textNotFound = getByText('Page requested not found');
  expect(textNotFound).toBeInTheDocument();
  expect(document.querySelector('h2')).toBeInTheDocument();
  expect(textNotFound.tagName).toBe('H2');
});

test('A página deve exibir a referida imagem', () => {
  const { getAllByRole } = render(<NotFound />);
  const imgNotFound = getAllByRole('img')[1];
  expect(imgNotFound).toBeInTheDocument();
  expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
