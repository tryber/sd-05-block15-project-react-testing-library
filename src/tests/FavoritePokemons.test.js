import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
​
afterEach(cleanup);
​
describe('', () => {
​
  test('', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );
​
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
​
  test('', () => {
    const { getByText, getByLabelText } = render(<MemoryRouter><App /></MemoryRouter>);
​
    fireEvent.click(getByText(/more details/i));
    fireEvent.click(getByLabelText(/pokémon favoritado/i));
    fireEvent.click(getByText(/Favorite Pokémons/i));
​
    expect(getByText(/More details/i)).toBeInTheDocument();
​
  })
​
  test('', () => {
    const { getByText, getByLabelText, getAllByText } = render(<MemoryRouter><App /></MemoryRouter>);
​
    localStorage.clear();
​
    fireEvent.click(getByText(/bug/i))
    fireEvent.click(getByText(/more details/i));
    fireEvent.click(getByLabelText(/pokémon favoritado/i));
    fireEvent.click(getByText(/home/i));
​
    fireEvent.click(getByText(/fire/i));
    fireEvent.click(getByText(/more details/i));
    fireEvent.click(getByLabelText(/pokémon favoritado/i));
    fireEvent.click(getByText(/Favorite Pokémons/i));
​
    expect(getAllByText(/More details/i).length).toBe(2);
​
  })
​
})
​
​
// Caso a pessoa não tenha pokémons favoritos, a mensagem No favorite pokemon found deve aparecer na tela. OK
​
// A página não deve exibir nenhum card de pokémon não favoritado. OK
​
// A página deve exibir todos os cards de pokémons favoritados; OK