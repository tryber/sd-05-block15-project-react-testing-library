import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

// esta função veio do GitHub do Kent C. Dodds
const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>), history,
  };
};

afterEach(cleanup);

describe('O que deve aparecer na página "Not Found"', () => {
  test('A página deve conter um heading h2 com o texto Page requested not found 😭', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/goku');
    expect(getByText('Page requested not found').tagName).toBe('H2');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
  test('A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { queryByAltText, history } = renderWithRouter(<App />);
    history.push('/gohan');
    expect(queryByAltText('Pikachu crying because the page requested was not found')).toBeInTheDocument();
    expect(queryByAltText('Pikachu crying because the page requested was not found')).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
