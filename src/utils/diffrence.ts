export const difference = (arr1: string[], arr2: string[]) =>
  arr1.filter((x) => !arr2.includes(x));
