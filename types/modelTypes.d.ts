interface ClMessage {
  __typename: 'ClMessage';
  id: string;
  content: string;
  when: string;
  roomId: string | null;
  createdAt: string | null;
}

interface ClRoom {
  __typename: 'ClRoom';
  id: string;
  createdAt: string | null;
}
