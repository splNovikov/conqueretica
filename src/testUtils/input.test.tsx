import { ReactWrapper } from 'enzyme';

export const updateInputValue = (input: ReactWrapper, value: string) => {
  return input.simulate('change', { target: { value } });
};

export const getInputValue = (input: ReactWrapper) => {
  return input.prop('value');
};

it('getInputValue Dummy test', () => {
  const res = getInputValue({ prop: () => 'val' });

  expect(res).toBe('val');
});
