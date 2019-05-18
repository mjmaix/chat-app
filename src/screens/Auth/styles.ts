import { StyleSheet } from 'react-native';
import {
  componentOverridesStyles,
  containerStyles,
  formStyles,
} from './../../components/commonStyles';
import { StyleGuide } from './../../core/themes/StyleGuide';
export const styles = StyleSheet.create({
  container: containerStyles.fullCenter,
  ...formStyles,
  ...componentOverridesStyles,
  input: {
    textAlign: 'center',
  },
  headerText: {
    paddingVertical: StyleGuide.gap.regular,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: StyleGuide.gap.big,
  },
});
