import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import About from '../components/About';
// import App from '../App';

test('A página "About" deve exibir informações sobre a Pokédex', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <About />
    </Router>,
  );
  expect(getByText(/About Pokédex/i)).toBeInTheDocument();
});

const renderWithRouter = (comp) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{comp}</Router>), history,
  };
};

test('A página deve conter um heading h2 com o texto About Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);

  const h2 = getByText('About Pokédex');
  expect(h2).toBeInTheDocument();
  expect(h2.tagName).toBe('H2');
});

test('A página deve conter a imagem de uma Pokédex', () => {
  const { container } = renderWithRouter(<About />);

  const image = container.querySelector('img');
  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
