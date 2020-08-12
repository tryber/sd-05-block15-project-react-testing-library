import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('texto Page requested not found', () => {
  const { getByText, getAllByRole } = render(
    <NotFound />,
  );
  const batatinha = getByText(/Page requested not found/i);
  expect(batatinha).toBeInTheDocument();
  const abobrinha = getAllByRole('img',
  {src:`https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`});
  expect(abobrinha[0]).toBeInTheDocument();
});
