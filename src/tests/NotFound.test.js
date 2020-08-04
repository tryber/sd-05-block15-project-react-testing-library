import React from 'react';
import { MemoryRouter } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import { cleanup, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

afterEach(cleanup);

test('renders a reading H2 with the text `Page requested not found`', () => {
  const { getByText, container } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  const heading = getByText(/Page requested not found/);
  expect(heading).toBeInTheDocument();
  const TagH2 = container.querySelector('h2');
  expect(TagH2).toBeInTheDocument();
});

test('renders specific image`', () => {
  const { container } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  expect(container.querySelector('img')).toBeInTheDocument();
  expect(container.querySelector('img')).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
