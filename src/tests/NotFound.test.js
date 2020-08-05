import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import { NotFound } from '../components';

const resetHistory = () => {
  const {
    container,
  } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>,
  );
  return { container };
};

describe('Testing NotFound page', () => {
  afterEach(cleanup);

  test('Test page exists', () => {
    const { container } = resetHistory();
    const h2 = container.querySelector('h2');
    expect(h2.innerHTML).toBe('Page requested not found<span role=\"img\" aria-label=\"Crying emoji\"> 😭 </span>');
  });

  test('Image source', () => {
    const { container } = resetHistory();
    const imgPath = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = container.querySelector('.not-found-image');
    expect(image.src).toBe(imgPath);
  });
});