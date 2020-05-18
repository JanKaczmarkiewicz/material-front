export const getKeys = <T extends {}>(o: T): Array<keyof T> =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  <Array<keyof T>>Object.keys(o);
