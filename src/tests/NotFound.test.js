import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

test('h2 text and emoji of notFound component', () => {
  const { container, getByText, getAllByRole } = render(<NotFound />);

  const h2 = container.querySelectorAll('h2').length;
  expect(h2).toBe(1);
  const h2Text = getByText('Page requested not found');
  expect(h2Text).toBeInTheDocument();
  const spanEmoji = getAllByRole('img');
  expect(spanEmoji[0]).toHaveAttribute('aria-label', 'Crying emoji');
});

test('img crying pokemon of notFound component', () => {
  const { getAllByRole, getByAltText } = render(<NotFound />);

  const imgAlt = getByAltText('Pikachu crying because the page requested was not found');
  expect(imgAlt).toBeInTheDocument();
  const gifImg = getAllByRole('img');
  expect(gifImg[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
