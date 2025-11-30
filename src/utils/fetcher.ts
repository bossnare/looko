export const fetcher = async (url: string) => {
  const api = await fetch(`http://localhost:5000/api${url}`);
  return await api.json();
};
