import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa as informações da página de detalhes', () => {
  afterEach(cleanup);

  test('contém informações do pokemon selecionado', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const buttonDetails = getAllByRole('link')[3];
    fireEvent.click(buttonDetails);
    const title = getByText('Pikachu Details');
    expect(title).toBeInTheDocument();
    expect(buttonDetails).not.toBeInTheDocument();
    const heading = getByText('Summary');
    expect(heading).toBeInTheDocument();
    expect(heading.nextElementSibling.innerHTML).toMatch(/This intelligent Pokémon roasts/);
  });

  test('exibe uma seção de mapas com a localização', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const buttonDetails = getAllByRole('link')[3];
    fireEvent.click(buttonDetails);
    const titleLocation = getByText('Game Locations of Pikachu');
    expect(titleLocation).toBeInTheDocument();
    const images = getAllByRole('img');
    expect(images[1].alt).toBe('Pikachu location');
    expect(images[1].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1].nextElementSibling.innerHTML).toBe('<em>Kanto Viridian Forest</em>');
    expect(images[2].alt).toBe('Pikachu location');
    expect(images[2].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(images[2].nextElementSibling.innerHTML).toBe('<em>Kanto Power Plant</em>');
  });

  test('a página de detalhes permite favoritar um pokemon', () => {
    const { getByText, getByRole, getAllByRole, getByLabelText } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/);
    fireEvent.click(moreDetails);

    const checkedBox = getByRole('checkbox');
    const labelCheckBox = getByLabelText('Pokémon favoritado?');
    expect(checkedBox).toBeInTheDocument();
    expect(labelCheckBox).toBeInTheDocument();

    fireEvent.click(checkedBox);
    const imagesClick1 = getAllByRole('img');
    expect(imagesClick1[1].alt).toMatch('Pikachu is marked as favorite');

    fireEvent.click(checkedBox);
    const imagesClick2 = getAllByRole('img');
    expect(imagesClick2[1].alt).not.toMatch('Pikachu is marked as favorite');
  });
});
