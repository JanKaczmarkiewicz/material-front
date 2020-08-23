const cutAt = 20;

export const shorterStreetName = (name: string) =>
  name.length > cutAt ? name.substr(0, cutAt) + "..." : name;
