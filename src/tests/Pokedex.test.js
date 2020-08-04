import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import App from '.App.js';

afterEach(cleanup);

// test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
//   const { getByText } = render(<App />);
//   const textNext = getByText(/Próximo pokémon/i);
//   expect(textNext).toBeInTheDocument();
//   fireEvent.click
// });