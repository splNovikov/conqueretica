import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders learn react link', () => {
  render(<Button aaa={1} />);
  const linkElement = screen.getByText(/Button plus/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link - minus', () => {
  render(<Button aaa={-1} />);
  const linkElement = screen.getByText(/Button minus/i);
  expect(linkElement).toBeInTheDocument();
});
