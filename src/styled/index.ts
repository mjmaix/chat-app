import { StyleSheet } from 'react-native';
import { Input, InputProps } from 'react-native-elements';
import styled from 'styled-components/native';

import { Button, ErrorText } from '../components';
import { StyleGuide } from '../core';

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
});

export * from './StyledViews';
export * from './StyledView';
export * from './StyledScreenContainer';
export * from './StyledScrollView';
export * from './StyledBlurredView';
export * from './StyledFormContainer';
export * from './StyledErrorComponents';

export const StyledTextInput = styled(Input).attrs(props => {
  return {
    editable: props.editable,
  };
})``;

export const StyledButton = styled(Button).attrs(props => ({}))``;

export const StyledFormOverImageContainer = styled.View`
  background-color: 'rgba(255,255,255,0.3)';
  border-radius: ${StyleGuide.gap.big};
  align-items: center;
  justify-content: center;
  width: 90%;
  padding-top: ${StyleGuide.gap.big};
  padding-bottom: ${StyleGuide.gap.big};
`;
