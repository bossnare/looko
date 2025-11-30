export const getRandom = (arr: string[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
