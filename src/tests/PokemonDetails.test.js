import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import App from '../App';

describe('Deve conter mais informações sobre apenas o pokémon selecionado;', () => {
  test('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const history = createMemoryHistory();
    history.push('/pokemons/25');
    expect(getByText(/pikachu details/i)).toBeInTheDocument();
  });

  test('O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const history = createMemoryHistory();
    history.push('/pokemons/25');
    expect(queryByText(/more details/i)).not.ToBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary;', () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(container.innerHTML.includes('h2'));
    expect(getByText(/summary/i)).toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado', () => {
    const { getByText, container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const history = createMemoryHistory();
    history.push('pokemons/25');
    expect(container.innerHTML.includes('p'));
    expect(getByText(/pikachu details/i));
  });
});
