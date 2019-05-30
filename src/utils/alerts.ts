import { Alert } from 'react-native';
import { error } from '../core';

export const alertOk = (cb: () => void) => {
  Alert.alert('Success', undefined, [
    {
      text: 'OK',
      onPress: cb,
    },
  ]);
};

export const alertFail = (cb: () => void, err: Error) => {
  const okAction = [
    {
      text: 'OK',
      onPress: cb,
    },
  ];
  error(err);
  Alert.alert(
    'Oops, failed',
    __DEV__ ? JSON.stringify(err) : undefined,
    cb ? okAction : undefined,
  );
};
