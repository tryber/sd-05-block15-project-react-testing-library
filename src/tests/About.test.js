import React from 'react';
import About from '../components/About';
import { createMemoryHistory } from 'history';
import { render } from 'react-dom';
import { MemoryRouter, Router } from 'react-router-dom';
import App from '../App';


test('A página "About" deve exibir informações sobre a Pokédex', () => {
  const { getByText } = render(
  <MemoryRouter>
    <About />
  </MemoryRouter>,
  );
  expect(getByText(/About Pokédex/i)).toBeInTheDocument();
});

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>), history,
  };
};

test('A página deve conter um heading h2 com o texto About Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />)
    expect(getByRole('h2', 'About Pokédex').toBeInTheDocument());
});
