import React, { FC } from 'react';
import { UserInfo } from 'firebase/auth';
// Interfaces
import { ILink } from '../../interfaces';
// Components
import SignOut from '../SignOut';
import Login from '../Login';
import Linky from '../Linky';
// Styles
import './Header.scss';

const googleLinks: ILink[] = [
  {
    id: '1',
    href: 'https://docs.google.com/spreadsheets',
    title: 'Sheets',
    // @ts-ignore
    createdAt: '',
  },
  {
    id: '2',
    href: 'https://docs.google.com/document',
    title: 'Docs',
    // @ts-ignore
    createdAt: '',
  },
  {
    id: '3',
    href: 'https://docs.google.com/presentation',
    title: 'Slides',
    // @ts-ignore
    createdAt: '',
  },
];

const Header: FC<{
  user: UserInfo | null | undefined;
}> = ({ user }) => (
  <div className="header">
    <div>
      {user ? (
        <div className="user-wrapper">
          <span className="user-name">{user.displayName}</span>
          <SignOut />
        </div>
      ) : (
        <Login />
      )}
    </div>
    <div>
      {googleLinks.map((l) => (
        <Linky link={l} colored key={l.id} iconSize="x-small" />
      ))}
    </div>
  </div>
);

export default Header;
