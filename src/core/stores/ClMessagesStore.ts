import React from 'react';
import { Alert } from 'react-native';

export interface ClMessagesStoreData {
  [k: string]: ClMessage;
}

export interface ClMessagesStoreInfo {
  data: ClMessagesStoreData;
  isReady?: boolean;
  update?: (k: ClMessagesStoreData) => void;
}

export const ClMessageContext = React.createContext<ClMessagesStoreInfo>({
  data: {},
  isReady: false,
  update: d => Alert.alert('not yet implemented'),
});

export const ClMessagesProvider = ClMessageContext.Provider;
export const ClMessagesConsumer = ClMessageContext.Consumer;
