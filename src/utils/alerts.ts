import { Alert, AlertIOS, AlertStatic, Platform } from 'react-native';

interface AlertOptions {
  message?: string;
}

export const alertClose = (cb: () => void, opts: AlertOptions = {}) => {
  Alert.alert(
    'Leave current screen?',
    opts.message || 'Changes you made will be lost.',
    [
      {
        text: 'Close',
        style: 'destructive',
        onPress: cb,
      },
      {
        text: 'Stay',
        style: 'cancel',
      },
    ],
    { cancelable: false },
  );
};

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
