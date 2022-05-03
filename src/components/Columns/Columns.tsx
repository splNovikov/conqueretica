import React, { FC } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Row, Skeleton } from 'antd';
// Firebase
import firebase from '../../firebase';
// Interfaces
import { IColumn, ITab } from '../../interfaces';
// Components
import Column from '../Column';
import ColumnsAddCategory from '../ColumnsAddCategory';
// Utils
import { httpErrorHandler } from '../../utils';
// Styles
import './Columns.scss';

const Columns: FC<{
  selectedTab: ITab;
}> = ({ selectedTab }) => {
  const qColumns = firebase.getColumnsQuery(selectedTab);
  const [columns = [], loadingColumns, columnsError] =
    useCollectionData<IColumn>(qColumns);
  const span = 4;

  if (columnsError?.message) {
    httpErrorHandler(columnsError);
    return null;
  }

  const handleCreateCategoryScenario = async (title: string) => {
    await firebase.addCategoryWithColumnScenario(title, selectedTab);
  };

  return (
    <Skeleton
      loading={loadingColumns}
      active
      round
      className="columns-skeleton"
    >
      <Row className="columns" gutter={[16, 16]}>
        {columns.map((column: IColumn) => (
          <Column span={span} key={column.id} column={column} />
        ))}
        {selectedTab?.id ? (
          <ColumnsAddCategory
            span={span}
            addCategoryScenarioHandler={handleCreateCategoryScenario}
          />
        ) : null}
      </Row>
    </Skeleton>
  );
};

export default Columns;
