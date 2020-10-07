import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';

describe('teste das rotas', () => {
  test('home', () => {
    const { getByText } = render(<App />);
    expect(getByText(/home/i)).toBeInTheDocument();
  })
  test('about', () => {

  })
  test('favorite pokemons', () => {

  })
})
