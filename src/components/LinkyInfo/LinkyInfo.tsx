import React, { FC } from 'react';
import { List, Typography } from 'antd';
// Interfaces
import { ILink } from '../../interfaces';
// Utils
import { deltaHumanTime, deltaSeconds } from '../../utils';
// Styles
import './LinkyInfo.scss';

const { Link, Text } = Typography;

const LinkyInfo: FC<{
  link: ILink;
}> = ({ link }) => {
  const created = deltaHumanTime(deltaSeconds(link.createdAt));
  const used = deltaHumanTime(deltaSeconds(link.lastUsed));

  return (
    <List size="small" className="linky-info">
      <List.Item className="linky-info-title-wrapper">
        <Text strong>{link.title}</Text>
      </List.Item>
      <List.Item>
        <Link href={link.href} ellipsis underline copyable>
          {link.href}
        </Link>
      </List.Item>
      <List.Item>
        <Text strong>Created: </Text>
        {created} ago
      </List.Item>
      <List.Item className="linky-info-last-used-wrapper">
        <Text strong>Last Used: </Text>
        {used ? `${used} ago` : 'not specified'}
      </List.Item>
    </List>
  );
};

export default LinkyInfo;
