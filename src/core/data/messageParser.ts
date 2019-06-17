import first from 'lodash/first';

import { ClUserStoreInfo } from '../../core';
import { ClConversationsStoreInfo } from '../stores/ClConversationsStore';
import { ConvoMessageItem } from '.';

function parseMessageData(
  convoStore: ClConversationsStoreInfo,
  userStore: ClUserStoreInfo,
) {
  const parsedConvos: ConvoMessageItem[] = Object.values(convoStore.data)
    .filter(convo => convo.messages && convo.messages.items) // NOTE: filter empty messages
    .map(convo => {
      const lastMessage = first((convo.messages as ClMessageConnection).items);
      // NOTE: already filtered, force to remove null on types
      return {
        name: convo.name as string,
        members: convo.members as string[],
        id: convo.id as string,
        currentClUser: userStore.data as ClUser,
        lastMessage: lastMessage as ClMessage,
      };
    });
  return parsedConvos;
}

export { parseMessageData };
