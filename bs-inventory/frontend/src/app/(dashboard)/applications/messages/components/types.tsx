export type Conversation = {
  id: string;
  avatar: string;
  name: string;
  date: string;
  message: string;
  owner: boolean;
  images?: string[];
  titleClass?: string;
  borderClass?: string;
};
