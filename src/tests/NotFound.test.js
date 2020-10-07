import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from '../App';

describe('testando a pagina de 404', () => {

  afterEach(cleanup);
  test('tem o texto correto e a tag correta', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>,
    );

    history.push('/404');

    const h2 = document.getElementsByTagName('h2')[0];

    expect(h2).not.toBe(undefined);

    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });

  test('tem a imagem correta', () => {
    const history = createMemoryHistory();
    const { getAllByRole } = render(
      <Router history={history}>
        <App />
      </Router>,
    );
    
    history.push('/404');

    expect(getAllByRole('img')[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});