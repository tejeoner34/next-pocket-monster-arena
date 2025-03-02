export const generateRandomNumber = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min);

export const getRandomElements = <T>(arr: T[], num: number) =>
  arr.sort(() => Math.random() - 0.5).slice(0, num);

export const getPercentageString = (partialValue: number, totalValue: number): string =>
  `${Math.floor((partialValue / totalValue) * 100)}%`;

export const createRandomId = () => Math.random().toString(36).substring(2, 15);
