import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

const renderWithRouter = (componente) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{componente}</Router>), history,
  };
};

test('testando se os links têm o texto correto e renderizam a página certa', () => {
  const { getByText, history, getByAltText } = renderWithRouter(<App />);

  const linkHome = getByText('Home');
  expect(linkHome).toBeInTheDocument();
  fireEvent.click(linkHome);
  expect(history.location.pathname).toBe('/');

  const linkAbout = getByText('About');
  expect(linkAbout).toBeInTheDocument();
  fireEvent.click(linkAbout);
  expect(history.location.pathname).toBe('/about');

  const linkFavoritos = getByText('Favorite Pokémons');
  expect(linkFavoritos).toBeInTheDocument();
  fireEvent.click(linkFavoritos);
  expect(history.location.pathname).toBe('/favorites');

  history.push('/outrolink');
  const textoNotFound = getByAltText('Pikachu crying because the page requested was not found');
  expect(textoNotFound).toBeInTheDocument();
});
