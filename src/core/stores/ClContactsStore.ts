import React from 'react';
import { Alert } from 'react-native';

export interface ClContactsStoreData {
  [k: string]: ClUser;
}

export interface ClContactsStoreInfo {
  data: ClContactsStoreData;
  isReady?: boolean;
  update?: (k: ClUser[]) => void;
}

export const ClContactContext = React.createContext<ClContactsStoreInfo>({
  data: {},
  isReady: false,
  update: d => Alert.alert('not yet implemented'),
});

export const ClContactsProvider = ClContactContext.Provider;
export const ClContactsConsumer = ClContactContext.Consumer;
