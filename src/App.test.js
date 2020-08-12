import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from './App';

{/* <Link className="link" to="/">{`Home`}</Link>
 */}
test('testando HOME', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )
  const home = getByText(/Home/i);
  expect(home).toBeInTheDocument();
})
