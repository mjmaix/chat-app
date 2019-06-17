import { IMessage } from 'react-native-gifted-chat/lib/types';
export interface ConvoMessageItem {
  currentClUser: ClUser;
  lastMessage?: ClMessage | null;
  name: string;
  members: string[];
  id: string;
}
// TODO: ChatScreen put to index.d.ts

export type GiftedConvoItem = ClMessage & IMessage;
