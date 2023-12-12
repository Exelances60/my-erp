export const calculatePercent = (target: number, value: number) => {
  if (value === 0 || target === 0) {
    return 0;
  }
  return Number((value / target) * 100).toFixed(2);
};
