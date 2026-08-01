export type Conversation = {
  id: string;
  type: "User" | "AI";
  message: string;
  animate?: boolean;
};
