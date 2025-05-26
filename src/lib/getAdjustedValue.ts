export const getAdjustedValue = (value?: number, amountGrams?: number) => {
  return (value * amountGrams) / 100;
};
