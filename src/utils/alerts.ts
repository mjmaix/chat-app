import { Alert } from 'react-native';

export const alertOk = (cb: () => void) => {
  Alert.alert('Success', undefined, [
    {
      text: 'OK',
      onPress: cb,
    },
  ]);
};

export const alertFail = (cb: () => void, err: Error | any) => {
  const okAction = [
    {
      text: 'OK',
      onPress: cb,
    },
  ];
  Alert.alert(
    'Oops, failed',
    __DEV__
      ? JSON.stringify(err)
      : 'Something went wrong. Check the form for more details.',
    cb ? okAction : undefined,
  );
};
