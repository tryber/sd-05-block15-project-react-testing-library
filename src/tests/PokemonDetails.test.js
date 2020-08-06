import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../tests/renderWithRouter';
import App from '../App';
import data from '../data';

data.forEach(({ id, name, summary, foundAt }) => {
  describe('Testes no arquivo PokemonDetails', () => {
    afterEach(cleanup);
    test('verifica se existe o nome do pokemon Details', () => {
      const { getByText, history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      const getNameScreen = getByText(`${name} Details`);
      expect(getNameScreen).toBeDefined();
    });
    it('verifica que More details não existe', () => {
      const { history, queryByText } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      const getDetails = queryByText(/More details/i);
      expect(getDetails).toBeNull();
    });
    it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
      const { history, getByText } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      const selectSummary = getByText(/Summary/i);
      expect(selectSummary).toBeInTheDocument();
      expect(selectSummary.tagName).toBe('H2');
    });
    it('A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado', () => {
      const { history, getByText } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      const textSummary = getByText(summary);
      expect(textSummary).toBeDefined();
      expect(textSummary.tagName).toBe('P');
    });
    it('A página de detalhes deve exibir uma seção com os mapas com as localizações do pokémon', () => {
      const { history, getByText, getAllByAltText } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      const gameLocation = getByText(`Game Locations of ${name}`);
      //  verifica se há o Texto "Game Locations of name":
      expect(gameLocation).toBeInTheDocument();
      // verifica se todas as localizações estão na tela em conjunto com suas imagens e alts
      foundAt.forEach(({ location, map }) => {
        expect(getByText(location)).toBeDefined();
        expect(getAllByAltText(`${name} location`).some(({ src }) => src === map)).toBeTruthy();
      });
    });
    it('A página de detalhes deve permitir favoritar um pokémon', () => {
      const { getByLabelText, history, getByRole } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      const favoritado = getByLabelText(/Pokémon favoritado?/i);
      expect(favoritado).toBeInTheDocument();
      const checkBox = getByRole('checkbox');
      fireEvent.click(checkBox);
      expect(checkBox.checked).toBeTruthy();
    });
  });
});

