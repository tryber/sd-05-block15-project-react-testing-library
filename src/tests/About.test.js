import React from 'react';
import About from '../components/About';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';

describe('testes na pagina About', () => {
  afterEach(cleanup);
  test('testando se o texto About Pokédex aparece', () => {
    const { getByText } = renderWithRouter(<About />);
    const textAbout = getByText(/About Pokédex/i);
    expect(textAbout).toBeInTheDocument();
  });

  it('testando se o h2 existe e tem o conteudo About Pokedex', () => {
    renderWithRouter(<About />);
    const selectH2 = document.querySelector('h2');
    expect(selectH2).toBeInTheDocument();
    expect(selectH2).toHaveTextContent('About Pokédex');
  });

  it('testando se existem dois paragrafos', () => {
    renderWithRouter(<About />);
    const selectP = document.querySelectorAll('p');
    expect(selectP.length).toBe(2);
  });

  it('testa se a imagem possui o endereço correto da imagem', () => {
    const { getByRole } = renderWithRouter(<About />);
    const selectImg = getByRole('img');
    //  console.log(selectImg.getAttributeNames());
    //  console.log(selectImg.src);
    expect(selectImg.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
