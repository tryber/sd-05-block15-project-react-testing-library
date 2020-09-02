import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('renders a text with information about Pokedéx', () => {
  const { getByText } = render(
    <About />
  )
});