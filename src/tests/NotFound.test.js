import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';

afterEach(cleanup);

const renderWithRoutere = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>), history,
  };
};

test('page should have -Page requested no found- text', () => {
  const { getByRole, getByText } = renderWithRoutere(<NotFound />);
  const h2 = getByRole('heading');
  const message = getByText(/Page requested not found/i);
  expect(h2).toBeInTheDocument();
  expect(message).toBeInTheDocument();
});

test('page should render image', () => {
  const { getByAltText } = renderWithRoutere(<NotFound />);
  const image = getByAltText('Pikachu crying because the page requested was not found');
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
