// import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
// import { render } from '@testing-library/react';
// import App from '../App';

// test('Verificar se existe "About"', () => {
//   const { getByText } = render(
//     <MemoryRouter initialEntries={['/about']}>
//       <App />
//     </MemoryRouter>,
//   );

//   const about = getByText(/About Pokedéx/i);
//   expect(getByText(about)).toBeInTheDocument();
// });

// test('Verificar se existe "About"', () => {
//     const { getBy } = render(
//       <MemoryRouter initialEntries={['/']}>
//         <App />
//       </MemoryRouter>,
//     );

//     const about = getByText(/About Pokedéx/i);
//     expect(getByText(about)).toBeInTheDocument();
//   });
//