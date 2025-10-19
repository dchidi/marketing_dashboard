export const formatTotal = (num: number, dp: number = 2): string => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(dp) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(dp) + "k";
  return num ? String(num) : "0";

  // const ttq = total ?? 0;
  // return ttq >= 1000 ? `${(ttq / 1000).toFixed(1)}k` : `${ttq}`;
};
