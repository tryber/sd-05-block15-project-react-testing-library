import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import data from '../data';

const allPokeTypes = [...new Set(data.reduce((types, { type }) => [...types, type], []))];

describe('Testando o componente Pokédex.', () => {
  describe('Testando o botão Próximo pokémon', () => {
    it('Ao apertar o botão de próximo, a página deve exibir o próximo pokemón da lista.', () => {
      const { queryByText, getByTestId } = render(<MemoryRouter><App /></MemoryRouter>);
      const nextButton = queryByText(/Próximo pokémon/i);
      expect(nextButton).toBeInTheDocument();
      expect(nextButton.tagName).toBe('BUTTON');

      let actualPokemon = getByTestId('pokemon-name');
      expect(actualPokemon.innerHTML).toBe(data[0].name);
      fireEvent.click(nextButton);
      actualPokemon = getByTestId('pokemon-name');
      expect(actualPokemon.innerHTML).toBe(data[1].name);
    });

    it('Cliques sucessivos no botão devem mostrar o próximo pokemon.', () => {
      const { queryByText, getByTestId } = render(<MemoryRouter><App /></MemoryRouter>);
      const nextButton = queryByText(/Próximo pokémon/i);

      for (let i = 1; i <= 5; i += 1) {
        fireEvent.click(nextButton);
        const actualPokemon = getByTestId('pokemon-name').innerHTML;
        expect(actualPokemon).toBe(data[i].name);
      }
    });

    it('Ao se chegar ao último pokémon da lista, a Pokédex deve voltar para o primeiro pokémon no apertar do botão.', () => {
      const { queryByText, getByTestId } = render(<MemoryRouter><App /></MemoryRouter>);
      const nextButton = queryByText(/Próximo pokémon/i);

      for (let i = 1; i <= data.length; i += 1) {
        fireEvent.click(nextButton);
      }
      const actualPokemon = getByTestId('pokemon-name').innerHTML;
      expect(actualPokemon).toBe(data[0].name);
    });
  });

  it('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { getAllByTestId } = render(<MemoryRouter><App /></MemoryRouter>);
    const quantityPokes = getAllByTestId('pokemon-name');
    expect(quantityPokes.length).toBe(1);
  });

  describe('A Pokédex deve conter botões de filtro', () => {
    it('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo.', () => {
      const { queryByText, getAllByTestId, getByTestId } = render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const typeButon = getAllByTestId('pokemon-type-button')[1];
      const pokeTypes = data.filter(({ type }) => type === typeButon.innerHTML);
      fireEvent.click(typeButon);
      for (let poke = 0; poke < pokeTypes.length; poke += 1) {
        const actualPokemon = getByTestId('pokemonType').innerHTML;
        expect(actualPokemon).toBe(typeButon.innerHTML);
        fireEvent.click(queryByText(/Próximo pokémon/i));
      }
    });

    it('O texto do botão deve ser o nome do tipo, e ser gerado dinãmicamente.', () => {
      const { getAllByTestId } = render(<MemoryRouter><App /></MemoryRouter>);
      const typeButon = getAllByTestId('pokemon-type-button');
      typeButon.forEach(({ innerHTML }) => {
        expect(allPokeTypes).toContain(innerHTML);
      });
    });
    it('Botão proximo pokemon deve ser desabilitado quando a lista filtrada conter apenas um pokémon.', () => {
      const { queryByText, getAllByTestId } = render(<MemoryRouter><App /></MemoryRouter>);
      const count = (pType) => data.filter(({ type }) => type === pType).length;
      const pokeTypeCount = allPokeTypes.reduce((acc, pType) => {
        acc[pType] = count(pType);
        return acc;
      }, {});
      const filterButtons = getAllByTestId('pokemon-type-button');
      const filterTxt = Object.entries(pokeTypeCount).find((poke) => poke[1] === 1)[0];
      fireEvent.click(filterButtons.find((btn) => btn.innerHTML === filterTxt));
      const nextButton = queryByText(/Próximo pokémon/i);
      expect(nextButton).toBeDisabled();
    });

    describe('Deve conter um botão para resetar o filtro', () => {
      it('O texto do botão deve ser All', () => {
        const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
        const resetButton = getByText('All');
        expect(resetButton.tagName).toBe('BUTTON');
      });

      it('Quando a página Carrega o filtro selecionado deve ser o All', () => {
        const { queryByText, queryByTestId } = render(<MemoryRouter><App /></MemoryRouter>);
        const nextButton = queryByText(/Próximo pokémon/i);
        const actualType = data.find(Boolean).type;
        const nextType = data.find(({ type }) => type !== actualType);
        for (let index = 0; index < data.indexOf(nextType); index += 1) {
          fireEvent.click(nextButton);
        }
        expect(queryByTestId('pokemonType').innerHTML).not.toBe(actualType);
      });

      it('Após clicá-lo, a Pokédex deve voltar a circular por todos os pokémons', () => {
        const { queryByText, queryByTestId, queryAllByTestId } = render(
          <MemoryRouter>
            <App />
          </MemoryRouter>,
        );
        const resetButton = queryByText('All');
        const nextButton = queryByText(/Próximo pokémon/i);
        const actualType = queryByTestId('pokemonType').innerHTML;
        const setFilter = queryAllByTestId('pokemon-type-button').find(({ innerHTML }) => innerHTML !== actualType);
        const nextType = data.find(({ type }) => type !== actualType);
        fireEvent.click(setFilter);
        expect(queryByTestId('pokemonType').innerHTML).not.toBe(actualType);
        fireEvent.click(resetButton);
        for (let index = 0; index < data.indexOf(nextType); index += 1) {
          fireEvent.click(nextButton);
        }
        expect(queryByTestId('pokemonType').innerHTML).not.toBe(actualType);
      });
    });
  });
});
