import React from 'react';
// import About from '../components/About';
import renderWithRouter from '../components/renderWithRouter';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';
// import { render } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
// import App from '../App';

test('A página "About" deve exibir informações sobre a Pokédex', () => {
  const { getByTestId } = renderWithRouter(<Pokemon />);
  expect(getByTestId('pokemon-overview')).toBeInTheDocument();
});
