export interface ChatUsers {
  result: ChatUser;
}

interface ChatUser {
  id: number,
  name: string,
  currentStatus: string,
}
