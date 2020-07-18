const matchLetters = /\D/g;

export const sortByHouseNumber = <T>(
  items: T[],
  getNumber: (item: T) => string | undefined
): T[] =>
  items.sort((e1, e2) => {
    const firstNumber = getNumber(e1);
    const secondNumber = getNumber(e2);

    if (!firstNumber || !secondNumber) return 0;

    const a = firstNumber.replace(matchLetters, "");
    const b = secondNumber.replace(matchLetters, "");

    const aValue = Number.parseInt(a, 10);
    const bValue = Number.parseInt(b, 10);

    if (Number.isNaN(aValue) || Number.isNaN(bValue)) return 0;

    return aValue > bValue ? 1 : -1;
  });
