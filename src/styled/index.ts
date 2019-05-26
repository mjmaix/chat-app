import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { containerStyles, formStyles } from '../components/commonStyles';
import { StyledComponent } from '../core/themes';

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
  },
  text: {
    fontWeight: 'bold',
  },
});

export const ScreenContainer = styled.SafeAreaView<StyledComponent>`
  ${props => ({
    ...containerStyles.fullCenter,
    backgroundColor: props.theme.colors.bgColor,
  })};
`;

export const BoldText = styled.Text<StyledComponent>`
  ${props => ({
    ...styles.text,
    color: props.theme.colors.primary,
  })}
`;

export const TopContainer = styled.View`
  ${props => ({
    ...containerStyles.fixedTop,
    ...styles.searchContainer,
  })}
`;

export const FormContainer = styled.View`
  ${props => ({
    ...formStyles.form,
  })}
`;

export const FormRow = styled.View`
  ${props => ({
    ...formStyles.formItem,
  })}
`;
