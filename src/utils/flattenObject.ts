/**
 * Utility function that transforms given object by
 * @returns flatten
 */
export default (propertyName: string, object: any) =>
  Object.keys(object).reduce(
    (obj, name) => ({ ...obj, [name]: object[name][propertyName] }),
    {}
  );
