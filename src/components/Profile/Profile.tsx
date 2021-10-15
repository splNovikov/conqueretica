import React, { FC } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Profile: FC = () => <Avatar size="large" icon={<UserOutlined />} />;

export default Profile;
