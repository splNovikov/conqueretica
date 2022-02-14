import { getNextSibling } from './getNextSibling';

describe('Get Next Sibling util', () => {
  it('Positive case - get next', () => {
    const arr = [{ a: 1 }, { a: 2 }];
    expect(getNextSibling(arr, { a: 1 }, 'a')).toEqual({ a: 2 });
  });

  it('Get previous when it was the last element', () => {
    const arr = [{ a: 1 }, { a: 2 }];
    expect(getNextSibling(arr, { a: 2 }, 'a')).toEqual({ a: 1 });
  });

  it('Return undefined if array length <= 1', () => {
    const arr: any[] = [];
    expect(getNextSibling(arr, {}, 'a')).toBeUndefined();
  });
});
