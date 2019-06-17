import last from 'lodash/last';

import { ClUserStoreInfo } from '../../core';
import { ClConversationsStoreInfo } from '../stores/ClConversationsStore';
import { ConvoMessageItem } from './compositeTypes';

function parseMessageData(
  convoStore: ClConversationsStoreInfo,
  userStore: ClUserStoreInfo,
) {
  const parsedConvos: ConvoMessageItem[] = Object.values(convoStore.data)
    .filter(convo => convo.messages && convo.messages.items) // NOTE: filter empty messages
    .map(convo => {
      const lastMessage = last((convo.messages as ClMessageConnection).items);
      // NOTE: already filtered, force to remove null on types
      return {
        name: convo.name as string,
        members: convo.members as string[],
        id: convo.id as string,
        currentClUser: userStore.data as ClUser,
        lastMessage: (lastMessage
          ? {
              ...lastMessage,
              updatedAt: lastMessage.updatedAt
                ? new Date(lastMessage.updatedAt)
                : lastMessage.updatedAt,
              createdAt: lastMessage.createdAt
                ? new Date(lastMessage.createdAt)
                : lastMessage.createdAt,
            }
          : null) as ClMessage | null | undefined,
      };
    });
  return parsedConvos;
}

export { parseMessageData };
