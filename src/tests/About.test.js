import React from 'react';
import { Router } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import About from '../components/About';

describe('teste do arquivo about', () => {
  afterEach(cleanup);

  test('Página about informa sobre a pokédex', () => {
    const { getByText, getByRole } = render(<About />);
    const title = getByText(/About Pokédex/);
    console.log(title);
    expect(title).toBeInTheDocument();
    expect(title.type).toBe('h2');
    
    
  });


});