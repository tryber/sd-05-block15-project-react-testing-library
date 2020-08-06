import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../tests/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const favPokemons = {
  25: false,
  4: false,
  10: false,
  23: false,
  65: false,
  151: false,
  78: false,
  143: false,
  148: false,
};

// function getTypes(array) {
//   const arrayTypes = [];
//   array.map((item) => {
//     if (!arrayTypes.includes(item.type)) {
//       arrayTypes.push(item.type);
//     }
//   });
//   arrayTypes.push('All');
//   return arrayTypes;
// }

const arrayTipos = ['Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Normal',
  'Dragon',
  'All',
];

describe('testes no componente Pokedex', () => {
  afterEach(cleanup);
  test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={pokemons} isPokemonFavoriteById={favPokemons}
    />);
    const btnNext = getByText(/Próximo pokémon/i);
    expect(btnNext).toBeInTheDocument();
    pokemons.forEach((pokemon) => {
      const pokemonName = getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      fireEvent.click(btnNext);
    });
    expect(getByText(pokemons[0].name)).toBeInTheDocument();
  });

  it('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { getByText, queryByText } = renderWithRouter(<Pokedex
      pokemons={pokemons} isPokemonFavoriteById={favPokemons}
    />);
    const btnNext = getByText(/Próximo pokémon/i);
    expect(btnNext).toBeInTheDocument();
    pokemons.forEach((pokemon) => {
      const pokemonName = getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      const arrayWithoutCurrent = pokemons.filter((item) => item.name !== pokemon.name);
      arrayWithoutCurrent.forEach((item) => {
        expect(queryByText(item.name)).toBeNull();
      });
      fireEvent.click(btnNext);
    });
  });

  it('A Pokédex deve gerar, dinamicamente, um botão de filtro para cada tipo de pokémon', () => {
    const { getAllByRole } = renderWithRouter(<Pokedex
      pokemons={pokemons} isPokemonFavoriteById={favPokemons}
    />);

    const everyButton = getAllByRole('button');
    const textAllButtons = [];
    everyButton.forEach((button) => {
      textAllButtons.push(button.innerHTML);
    });
    arrayTipos.forEach((tipo) => {
      expect(textAllButtons).toContain(tipo);
      // checa se cada tipo está em um botão, se não estiver, o teste quebra
    });
  });

  it('ao clicar em um botao de filtro, somente itens daquele filtro devem ser mostrados e se houver apenas um item do tipo, o botao deve estar desabilitado', () => {
    const { getByText, getAllByRole } = renderWithRouter(<Pokedex
      pokemons={pokemons} isPokemonFavoriteById={favPokemons}
    />);
    const everyButton = getAllByRole('button');
    for (let i = 0; i < everyButton.length - 1; i += 1) {
      fireEvent.click(everyButton[i]);
      const filtrados = pokemons.filter((pokemon) => {
        if (everyButton[i].innerHTML === 'All') return true;
        return pokemon.type === everyButton[i].innerHTML;
      });
      if (filtrados.length === 1) {
        const buttonNext = getByText(/Próximo pokémon/i);
        expect(buttonNext.disabled).toBe(true);
      }
      //  console.log(filtrados[0].name);
      const currentPokemon = getByText(filtrados[0].name);
      expect(currentPokemon).toBeInTheDocument();
      if (everyButton[i].innerHTML !== 'All') expect(filtrados[0].type).toBe(everyButton[i].innerHTML);
    }
  });
  it('teste que não estava no enunciado, mas eh necessário', () => {
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={pokemons} isPokemonFavoriteById={favPokemons}
    />);
    const getText = getByText(/Encountered pokémons/i);
    expect(getText).toBeInTheDocument();
  });
  it('outro teste que não estava no enunciado, mas eh necessário', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={pokemons} isPokemonFavoriteById={favPokemons}
    />);
    expect(getAllByTestId('pokemon-type-button')).toHaveLength(7);
    //  no primeiro dia o dataTestID não funcionava. logo, o teste era
    //  feito pelo nome dos botões e não opelo testid.
  });
});
