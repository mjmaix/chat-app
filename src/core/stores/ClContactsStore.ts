import React from 'react';
import { Alert } from 'react-native';

export interface ClContactsStoreData {
  [k: string]: ClUser;
}

export interface ClContactsStoreInfo {
  data: ClContactsStoreData;
  isReady?: boolean;
  update?: (k: ClContactsStoreData) => void;
}

const ClContactContext = React.createContext<ClContactsStoreInfo>({
  data: {},
  isReady: false,
  update: d => Alert.alert('not yet implemented'),
});

export const ClContactsProvider = ClContactContext.Provider;
export const ClContactsConsumer = ClContactContext.Consumer;
