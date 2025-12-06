export type User = {
  id: string;
  username: string;
};

export type Message = {
  id: string;
  content: string;
  sentAt: number;
  user: User | null;
};
