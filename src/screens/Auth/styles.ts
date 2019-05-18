import { StyleSheet } from 'react-native';
import {
  componentOverridesStyles,
  containerStyles,
  formStyles,
} from './../../components/commonStyles';
export const styles = StyleSheet.create({
  container: containerStyles.fullCenter,
  ...formStyles,
  ...componentOverridesStyles,
  input: {
    textAlign: 'center',
  },
});
