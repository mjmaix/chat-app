import React from 'react';
import { Alert } from 'react-native';

export interface ClConversationsStoreData {
  [k: string]: ClConversations;
}

export interface ClConversationsStoreInfo {
  data: ClConversationsStoreData;
  isReady?: boolean;
  update?: (k: ClConversationsStoreData) => void;
}

export const ClConversationsContext = React.createContext<
  ClConversationsStoreInfo
>({
  data: {},
  isReady: false,
  update: d => Alert.alert('not yet implemented'),
});

export const ClConversationsProvider = ClConversationsContext.Provider;
export const ClConversationsConsumer = ClConversationsContext.Consumer;
