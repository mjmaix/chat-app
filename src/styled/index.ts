import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import styled from 'styled-components/native';
import { Button, containerStyles, formStyles } from '../components';
import { StyleGuide } from '../core';

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
});

export * from './StyledViews';

export const StyledBoldText = styled.Text`
  ${props => ({
    ...styles.text,
    color: props.theme.colors.primary,
  })}
`;

export const StyledTextInput = styled(Input).attrs({})``;

export const StyledButton = styled(Button).attrs({})``;

export const StyledFormOverImageContainer = styled.View`
  background-color: 'rgba(255,255,255,0.3)';
  border-radius: ${StyleGuide.gap.big};
  align-items: center;
  justify-content: center;
  width: 90%;
  padding-top: ${StyleGuide.gap.big};
  padding-bottom: ${StyleGuide.gap.big};
`;
