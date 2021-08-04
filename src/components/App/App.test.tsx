import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('App is rendering', () => {
  const { container } = render(<App />);
  expect(container.firstChild).toHaveClass('app');
});
