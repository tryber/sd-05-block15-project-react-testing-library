import React from "react";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import App from "../App";

describe("Deve conter mais informações sobre apenas o pokémon selecionado;", () => {
  test("A página deve conter um texto <name> Details, onde <name> é o nome do pokémon", () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const history = createMemoryHistory();
    history.push("/pokemons/25");
    expect(getByText(/pikachu details/i)).toBeInTheDocument();
  });

  test("O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon", () => {
    const { queryByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const history = createMemoryHistory();
    history.push("/pokemons/25");
    expect(queryByText(/more details/i)).not.ToBeInTheDocument();
  });

  test("A seção de detalhes deve conter um heading h2 com o texto Summary;", () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(container.innerHTML.includes("h2"));
    expect(getByText(/summary/i)).toBeInTheDocument();
  });

  test("A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado", () => {
    const { getByText, container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const history = createMemoryHistory();
    history.push("pokemons/25");
    expect(container.innerHTML.includes("p"));
    expect(getByText(/pikachu details/i));
  });
});

// describe('A página de detalhes deve exibir uma 
// seção com os mapas com as localizações do pokémon', () => {

// test('A seção de detalhes deve conter um heading h2 com o 
// texto Game Locations of <name>, , onde <name> é o nome do pokémon exibido', () => {

// })
// test('A seção de detalhes deve exibir 
// todas as localizações do pokémon', () => {

// })

// test('Cada localização deve exibir o nome da 
// localização e uma imagem do mapa da localização', () => {

// })

// test('A imagem da localização deve ter 
// um atributo src com a URL da localização', () => {

// })

// test('A imagem da localização deve ter 
// um atributo alt com o texto <name> location, onde <name> é o nome do pokémon', () => {

// })
// })
