import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

const textTest = 'Page requested not found';
const imgToFind = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('Testando o componente NotFound', () => {
  it('A página deve conter um heading h2 com o texto Page requested not found 😭', () => {
    const { getByText } = render(<NotFound />);
    const findText = getByText(textTest);
    expect(findText).toBeInTheDocument();
    expect(findText.tagName).toBe('H2');
  });

  it('A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const { container } = render(<NotFound />);
    const imgToTest = container.querySelector('img');
    expect(imgToTest).toBeInTheDocument();
    expect(imgToTest.src).toBe(imgToFind);
  });
});
