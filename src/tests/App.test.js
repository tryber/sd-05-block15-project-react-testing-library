import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

const resetHistory = (path = '/') => {
  const { getByText, getByTestId } = render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
  return { getByText, getByTestId };
};

describe('Routes', () => {
  afterEach(cleanup);
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = resetHistory();
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Links exists', () => {
    let { getByText } = resetHistory();

    const links = [
      getByText(/home/i),
      getByText(/about/i),
      getByText(/favorite pokémons/i),
    ];
    links.forEach((link) => {
      expect(link).toBeInTheDocument();
    });

    getByText = resetHistory('/unknown').getByText;
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });

  test('Links home', () => {
    const { getByText } = resetHistory();
    fireEvent.click(getByText(/home/i));

    const encounteredPkm = getByText(/Encountered pokémons/i);
    expect(encounteredPkm).toBeInTheDocument();
  });

  test('Links about', () => {
    const { getByText } = resetHistory();
    fireEvent.click(getByText(/about/i));

    const abtPodekex = getByText(/About Pokédex/i);
    expect(abtPodekex).toBeInTheDocument();
  });

  test('Links favorite', () => {
    const { getByText, getByTestId } = resetHistory();
    fireEvent.click(getByText(/Favorite Pokémons/i));

    const favorite = getByTestId('favorites');
    expect(favorite).toBeInTheDocument();
  });
});
