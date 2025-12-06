export const dateFormat = (date: number) => {
  const d = new Date(date);
  return d.toLocaleString('fr-FR').split(' ')[1];
};
