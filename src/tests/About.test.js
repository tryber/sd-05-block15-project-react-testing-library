import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { About } from '../components';

const resetHistory = () => {
  const {
    getByText,
    getAllByRole,
    container,
  } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  return { getByText, getAllByRole, container };
};

describe('Routes', () => {
  afterEach(cleanup);

  test('renders pokedex infos', () => {
    const { getByText } = resetHistory();
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Check h2 about', () => {
    const { getByText, getAllByRole } = resetHistory();
    const abtPodekex = getByText(/About Pokédex/i);
    const heading = getAllByRole('heading');
    expect(abtPodekex).toBeInTheDocument();
    expect(heading.length).toBe(1);
  });

  test('Check 2 <p> description', () => {
    const { container } = resetHistory();
    const p = container.querySelectorAll('p');
    expect(p.length).toBe(2);
  });

  test('Testing image link', () => {
    const { container } = resetHistory();
    const imgPath = container.querySelector('img').src;
    const exp = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imgPath).toBe(exp);
  });
});
