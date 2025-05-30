export const getAdjustedValue = (value?: number, amountGrams?: number) => {
  return ((value ?? 0) * (amountGrams ?? 0)) / 100;
};
