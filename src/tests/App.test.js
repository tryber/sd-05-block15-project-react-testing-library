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

// jest.mock('react-router-dom', () => {
//   const originalModule = jest.requireActual('react-router-dom'); 
//   return {
//     ...originalModule,
//     BrowserRouter: ({ children }) => {
//       return (
//         <div>{children}</div>
//       );
//     }
//   };
// })

// const history = createMemoryHistory();
//   const { getAllByText } = render(
//     <Router history={history}>
//       <App />
//     </Router>
//   );

test('every link redirects to the right page', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );

  const homeLink = getByText('Home');
  fireEvent.click(homeLink);
  // console.log(history);
  expect(history.location.pathname).toBe('/');

  const aboutLink = getByText('About');
  fireEvent.click(aboutLink);
  // console.log(history);
  expect(history.location.pathname).toBe('/about');

  const favLinks = getByText('Favorite Pokémons');
  fireEvent.click(favLinks);
  expect(history.location.pathname).toBe('/favorites');
});
