import React, { FC } from 'react';

import './Button.scss';

// todo move to utils
export const tuple = <T extends string[]>(...args: T) => args;

const ButtonTypes = tuple(
  'default',
  'primary',
  'ghost',
  'dashed',
  'link',
  'text',
);
export type ButtonType = typeof ButtonTypes[number];

const ButtonHTMLTypes = tuple('submit', 'button', 'reset');
export type ButtonHTMLType = typeof ButtonHTMLTypes[number];

export interface BaseButtonProps {
  // todo: remove it
  aaa?: number;
  type?: ButtonType;
  icon?: React.ReactNode;
  loading?: boolean | { delay?: number };
}

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps;

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

const caseStudy = (aaa?: number) => (aaa && aaa > 0 ? 'plus' : 'minus');

const Button: FC<ButtonProps> = (props) => {
  const { aaa, htmlType = 'button' as ButtonProps['htmlType'] } = props;

  return (
    // eslint-disable-next-line react/button-has-type
    <button className="button" type={htmlType}>
      Button {caseStudy(aaa)}
    </button>
  );
};

export default Button;
