import React from 'react';
import { ReactWrapper, shallow } from 'enzyme';
import { Dropdown, Menu } from 'antd';

export const getSubmenuItems = (w: ReactWrapper) => {
  const dropdown = w.find(Dropdown);
  const submenu = shallow(<div>{dropdown.prop('overlay')}</div>);
  return submenu.find(Menu.Item);
};
