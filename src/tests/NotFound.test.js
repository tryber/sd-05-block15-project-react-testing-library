import React from 'react'
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('page contains a h2 heading with the text "Page requested not found 😭"', () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/blabla']}>
      <App />
    </MemoryRouter>
  )

  const h2 = container.querySelector('h2');
  expect(h2).toBeInTheDocument();
  expect(h2.textContent.trim()).toBe('Page requested not found 😭');
});
 

test('contains an specific image', () => {
  const { getAllByRole } = render(
    <MemoryRouter initialEntries={['/blabla']}>
      <App />
    </MemoryRouter>
  )

  const img = getAllByRole('img')
  expect(img.length).toBe(2);

  expect(img[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif')
})