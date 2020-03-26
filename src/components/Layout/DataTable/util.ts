import { RelationField, TextField } from "./Table/types";

const isRelationalField = (
  config: RelationField | TextField
): config is RelationField => (config as RelationField).getName !== undefined;

const getDisplayNames = (
  data: Record<string, any>,
  config: Record<string, any>
) =>
  Object.keys(data).reduce((values, key) => {
    const currentConfig = config[key];
    return {
      ...values,
      [key]: isRelationalField(currentConfig)
        ? currentConfig.getName(data[key])
        : data[key]
    };
  }, {});

export { getDisplayNames };
