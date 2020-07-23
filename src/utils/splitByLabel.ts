export type WithIndex<T> = T & { index: number };

export type Splited<T> = { [key: string]: WithIndex<T>[] };
export function splitByLabel<T>(
  items: T[],
  condition: (item: T) => string | undefined
) {
  const splited: Splited<T> = {};
  for (const [index, item] of items.entries()) {
    const key = condition(item);
    if (!key) continue;

    if (!splited[key]) {
      splited[key] = [];
    }
    const objWithIndex = { ...item, index };

    splited[key].push(objWithIndex);
  }
  return splited;
}
