export interface User {
  _id: string;
  avatar: string;
  username: string;
  fullName: string;
}

export interface MessageType {
  createdAt: string;
  message: string;
  reciverId: string;
  senderId: string;
  _id: string;
}
