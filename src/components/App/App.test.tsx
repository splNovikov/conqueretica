import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App a={1} />);
  const linkElement = screen.getByText(/hi there plus/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link - minus', () => {
  render(<App a={-1} />);
  const linkElement = screen.getByText(/hi there minus/i);
  expect(linkElement).toBeInTheDocument();
});
