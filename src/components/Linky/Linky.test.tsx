import React from 'react';
import { render } from '@testing-library/react';

import Linky from './Linky';

import { ILink } from '../../interfaces';

const link1: ILink = {
  id: '1',
  href: 'https://',
  title: 'title',
};

it('Linky is rendering', () => {
  const { container } = render(<Linky link={link1} />);
  expect(container.firstChild).toHaveClass('linky');
});

describe('Linky should has correct classes', () => {
  it('Should have "colored" class', () => {
    const { container } = render(<Linky link={link1} colored />);
    expect(container.firstChild).toHaveClass('colored');
  });

  it('Should have "big" class', () => {
    const { container } = render(<Linky link={link1} big />);
    expect(container.firstChild).toHaveClass('big');
  });

  it('Should have "ellipsed" class', () => {
    const { container } = render(<Linky link={link1} ellipsed />);
    expect(container.firstChild).toHaveClass('ellipsed');
  });
});

describe('Linky should has correct title', () => {
  it('Should have "predefined" title', () => {
    link1.title = 'predefined';

    const { container } = render(<Linky link={link1} />);
    expect(container.firstChild).toHaveTextContent('predefined');
  });

  it('Should have "https://" title', () => {
    link1.title = '';

    const { container } = render(<Linky link={link1} />);
    expect(container.firstChild).toHaveTextContent('https://');
  });
});
