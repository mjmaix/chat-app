import { StyleSheet } from 'react-native';
import { StyleGuide } from './../core/themes/StyleGuide';

export const formStyles = StyleSheet.create({
  form: {
    alignSelf: 'center',
    width: '90%',
  },
  formItem: {
    paddingBottom: StyleGuide.gap.regular,
  },
});

export const containerStyles = StyleSheet.create({
  fullCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
