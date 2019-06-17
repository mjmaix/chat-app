import filter from 'lodash/filter';

import { GiftedConvoItem } from './compositeTypes';

export const parseConvoToGifted = (convo: ClConversation) => {
  const { messages } = convo;
  const giftedObj: Partial<{
    messages: GiftedConvoItem[];
  }> = {};

  if (messages) {
    const filtered = filter<ClMessage | null>(messages.items, m => m !== null);
    const parsedMessages = (filtered as ClMessage[]).map((m: ClMessage) => {
      return {
        _id: m.id,
        text: m.content,
        createdAt: m.createdAt,
        user: {
          ...m.author,
          _id: m.id,
        },
      } as GiftedConvoItem;
    });

    giftedObj.messages = parsedMessages;
  }
  return giftedObj;
};
