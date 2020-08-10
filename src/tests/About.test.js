import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, getByRole } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `About Pokédex`', () => {
  const { getByText, getByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(getByText(/about/i));
  const about = getByText(/About Pokédex/i);
  expect(about).toBeInTheDocument();
  const pic = getByRole('img');
  expect(pic.src).not.toBe('');
  expect(pic.src).toBe(`https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`);
});