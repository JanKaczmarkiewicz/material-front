export default (check: boolean, error: string) => {
  if (!check) {
    throw new Error(error);
  }
};
