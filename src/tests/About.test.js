import React from 'react';
import { MemoryRouter } from 'react-router-dom';
//import { createMemoryHistory } from 'history';
import { cleanup, render } from '@testing-library/react';
import About from '../components/About';

afterEach(cleanup);

test('renders a reading H2 with the text `About Pokédex`', () => {
  const { getByText, container } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const heading = getByText(/About Pokédex/);
  expect(heading).toBeInTheDocument();
  const TagH2 = container.querySelector('h2');
  expect(TagH2).toBeInTheDocument();
});

test('renders two paragraphs`', () => {
  const { container } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const Ps = container.querySelector('p');
  expect(Ps).toBeInTheDocument();
  const TwoPs = container.querySelectorAll('p');
  expect(TwoPs.length).toBe(2);
});

test('renders specific image`', () => {
  const { queryByRole } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  expect(queryByRole('img')).toBeInTheDocument();

  // const SrcImage = ('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  expect(queryByRole('img')).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
