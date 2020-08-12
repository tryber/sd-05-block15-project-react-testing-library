import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('About deve exibir informações sobre a Pokédex', () => {
  const { getByText, getByRole } = render(
    <About />,
  );
  const batatinha = getByText(/About Pokédex/i);
  expect(batatinha).toBeInTheDocument();
  const abobrinha = getByRole('img');
  expect(abobrinha).toBeInTheDocument();
});
