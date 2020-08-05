import React from 'react';
import { render } from '@testing-library/react';
import { FavoritePokemons } from '../components';

test('no favorite page', () => {
  const { getByText } = render(<FavoritePokemons />);

  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});
