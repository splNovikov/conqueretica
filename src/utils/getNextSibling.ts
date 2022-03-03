// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNextSibling = (arr: any[], elem: any, criteria: string) => {
  if (!arr || !arr.length || arr.length <= 1) {
    return undefined;
  }

  const elemPosition = arr.findIndex((x) => x[criteria] === elem[criteria]);

  if (elemPosition === arr.length - 1) {
    return arr[elemPosition - 1];
  }

  return arr[elemPosition + 1];
};
