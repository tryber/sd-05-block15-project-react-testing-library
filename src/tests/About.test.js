import React from 'react';
import { cleanup, render } from '@testing-library/react';
import App from '../App';
import About from '../components/About';

afterEach(cleanup);

describe('requisito 2', () => {
  test('A página deve conter um heading h2 com o texto About Pokédex', () => {
    const { queryByText, container, querySelectorAll, getByText, queryByRole } = 
    render(<About />);
    const aboutPokedexTag = queryByText('About Pokédex');
    const containerParagraph = container.querySelectorAll('p');

    expect(aboutPokedexTag).toBeInTheDocument();
    expect(container.querySelector('h2')).toBeInTheDocument();
    expect (aboutPokedexTag.tagName).toBe('H2');
    expect(containerParagraph.length).toBe(2);
  });
});