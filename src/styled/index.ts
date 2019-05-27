import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import {
  Button,
  containerStyles,
  FormikInput,
  formStyles,
  TextInput,
} from '../components';

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
  },
  text: {
    fontWeight: 'bold',
  },
});

export const StyledScreenContainer = styled.SafeAreaView`
  ${props => ({
    ...containerStyles.fullCenter,
  })};
`;

export const StyledBoldText = styled.Text`
  ${props => ({
    ...styles.text,
    color: props.theme.colors.primary,
  })}
`;

export const StyledTopContainer = styled.View`
  ${props => ({
    ...containerStyles.fixedTop,
    ...styles.searchContainer,
  })}
`;

export const StyledFormContainer = styled.View`
  ${props => ({
    ...formStyles.form,
  })}
`;

export const StyledFormRow = styled.View`
  ${props => ({
    ...formStyles.formItem,
  })}
`;

export const StyledTextInput = styled(TextInput).attrs({})``;

export const StyledFormikInput = styled(FormikInput).attrs({})``;

export const StyledButton = styled(Button).attrs({})``;
