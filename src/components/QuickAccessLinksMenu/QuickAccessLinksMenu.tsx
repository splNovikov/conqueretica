import React, { FC } from 'react';
import { Card, Typography } from 'antd';
// Components
import GoogleIcon from '../GoogleIcon';
// Utils
import { identifyLink } from '../../utils';
// Styles
import './QuickAccessLinksMenu.scss';

const { Link } = Typography;

const googleLinks = [
  {
    id: '1',
    href: 'https://docs.google.com/spreadsheets',
    title: 'Sheets',
  },
  {
    id: '2',
    href: 'https://docs.google.com/document',
    title: 'Docs',
  },
  {
    id: '3',
    href: 'https://docs.google.com/presentation',
    title: 'Slides',
  },
  {
    id: '4',
    href: 'https://drive.google.com/drive',
    title: 'Drive',
  },
  {
    id: '5',
    href: 'https://meet.google.com/',
    title: 'Meet',
  },
  {
    id: '6',
    href: 'https://docs.google.com/drawings',
    title: 'Draw',
  },
  {
    id: '7',
    href: 'https://docs.google.com/forms',
    title: 'Forms',
  },
];

const QuickAccessLinksMenu: FC = () => (
  <Card className="quick-access-links-menu">
    {googleLinks.map((l) => {
      const iconType = identifyLink(l.href);

      return (
        <Link href={l.href} key={l.id}>
          <Card.Grid className="quick-access-links-menu-card">
            {iconType && <GoogleIcon icon={iconType} size="small" />}
            <div>{l.title}</div>
          </Card.Grid>
        </Link>
      );
    })}
  </Card>
);

export default QuickAccessLinksMenu;
