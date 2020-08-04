import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Notfound from '../components/NotFound';

afterEach(cleanup);

test('A página deve conter um heading h2 com o texto Page requested not found', () => {
  const { getByText } = render(<Notfound />);
  const textN = getByText('Page requested not found');
  expect(textN).toBeInTheDocument();
  expect(window.document.querySelector('h2')).toBeInTheDocument();
  expect(textN.tagName).toBe('H2');
});

test('A página deve exibir a imagem', () => {
  const { getAllByRole } = render(<Notfound />);
  const imgN = getAllByRole('img')[1];
  expect(imgN).toBeInTheDocument();
  expect(imgN.src).toBe(
    'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  );
});
