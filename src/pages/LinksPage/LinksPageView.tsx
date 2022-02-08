import React, { FC } from 'react';
import { Col } from 'antd';
// Interfaces
import { IColumn, ICategory, ILink, ITab } from '../../interfaces';
// Components
import ImportantLinks from '../../components/ImportantLinks';
import Linky from '../../components/Linky';
import AddForm from '../../components/AddForm';
import Tabs from '../../components/Tabs';
// Styles
import './LinksPageView.scss';

// todo: remove this:
const style = {
  border: '1px solid #0092ff',
};

const LinksPage: FC<{
  loadingTabs: boolean;
  importantLinks: ILink[];
  columns: IColumn[];
  tabs: ITab[];
  tabsFormSubmitHandler: (val: string) => void;
  selectedTab: ITab;
}> = ({
  loadingTabs,
  importantLinks,
  columns,
  tabs,
  tabsFormSubmitHandler,
  selectedTab,
}) => (
  <div className="links-page">
    <ImportantLinks links={importantLinks} />

    {loadingTabs && 'loading tabs progress...'}
    {tabs && tabs.length ? (
      <Tabs tabs={tabs} selectedTab={selectedTab} />
    ) : null}
    <AddForm formSubmitHandler={tabsFormSubmitHandler} />

    {/* // "ant-row" class instead of Row component because Row component is failing tests */}
    <div className="ant-row">
      {columns.map((column: IColumn) => (
        <Col key={column.id} span={6} style={style}>
          {column.categories.map((category: ICategory) => (
            <div key={category.id}>
              <div>{category.title}</div>
              {category.links.map((l: ILink) => (
                <div key={l.id} className="linky-wrapper">
                  <Linky link={l} ellipsed />
                </div>
              ))}
            </div>
          ))}
        </Col>
      ))}
    </div>
  </div>
);

export default LinksPage;
