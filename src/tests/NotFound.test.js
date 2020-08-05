import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('A página deve conter um heading `h2` com o texto `Page requested not found 😭`;', () => {
  const { getByText, history, container } = renderWithRouter(<App />);
  history.push('/nao-existe');
  expect(container.querySelector('h2')).toBeInTheDocument();
  expect(getByText('Page requested not found')).toBeInTheDocument();
  expect(container.querySelector('img').src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
