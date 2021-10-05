import React from 'react';
import { render } from '@testing-library/react';
import MainPage from './MainPage';

test('MainPage is rendering', () => {
  const { container } = render(<MainPage />);
  expect(container.firstChild).toHaveClass('app');
});
