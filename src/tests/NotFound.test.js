import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import { createMemoryHistory } from 'history';

import App from '../App';

test('Heading e Imagem', () => {
  const history = createMemoryHistory();
  history.push('/batatinha');
  const { getByText, container } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  const heading = getByText('Page requested not found');
  expect(heading).toBeInTheDocument();
  expect(heading.tagName).toBe('H2');
  const imagem = container.querySelector('img');
  expect(imagem.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
