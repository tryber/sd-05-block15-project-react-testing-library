import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import App from '../App';

  afterEach(cleanup);

  describe('Ao carregar a aplicação no caminho de URL “/”, a página principal da Pokédex deve ser mostrada', () => {
    test('renderiza um header com o texto `Pokédex`', () => {
      const { getByText } = render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      expect(getByText(/Pokédex/i)).toBeInTheDocument();
    });
