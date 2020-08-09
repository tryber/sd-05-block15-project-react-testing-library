import React from 'react';
import { render, cleanup, getByText } from '@testing-library/react';
import Notfound from '../components/NotFound';
afterEach(cleanup);

test('A página deve conter um heading h2 com o texto Page requested not found ', () => {
  const { getByText } = render(<Notfound />);
  const texto = getByText('Page requested not found');
  expect(texto).toBeInTheDocument();
  expect(document.querySelector('h2')).toBeInTheDocument();
  expect(texto.tagName).toBe('H2');
});

test('A página deve exibir a imagem  ', () => {
  const { getAllByRole } = render(<Notfound />);
  const imagem = getAllByRole('img')[1];
  expect(imagem).toBeInTheDocument();
  expect(imagem.src).toBe(
    'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  );
});
