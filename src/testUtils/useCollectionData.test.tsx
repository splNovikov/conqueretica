import { categories, columns, tabs } from '../__test_data__';

export const mockUseCollectionData = (response: any) => (query: any) => {
  if (!query) {
    return [];
  }

  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  const dataType = query._query.path.segments[0];

  if (dataType === 'tabs' && response) {
    return response;
  }

  if (dataType === 'tabs') {
    return [tabs, false, undefined];
  }

  if (dataType === 'columns' && response) {
    return response;
  }

  if (dataType === 'columns') {
    return [columns, false, undefined];
  }

  if (dataType === 'categories' && response) {
    return response;
  }

  if (dataType === 'categories') {
    return [categories, false, undefined];
  }

  return [];
};

// todo: make test for mockUseCollectionData
it('UseCollectionData Dummy Test', () => {
  expect(true).toBe(true);
});
