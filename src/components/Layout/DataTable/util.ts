const getDisplayNames = (
  data: Record<string, any>,
  config: Record<string, any>
) =>
  Object.keys(data).reduce((values, key) => {
    const currentConfig = config[key];
    return {
      ...values,
      [key]: currentConfig.getName
        ? currentConfig.getName(data[key])
        : data[key]
    };
  }, {});

export { getDisplayNames };
