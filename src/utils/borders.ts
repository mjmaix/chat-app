import { StyleSheet } from 'react-native';

const showBorders = false;

function DevEmpty(obj: any) {
  return showBorders && __DEV__ ? obj : {};
}

export const DevBorders = StyleSheet.create({
  red: DevEmpty({
    borderColor: 'red',
    borderWidth: 1
  })
});
