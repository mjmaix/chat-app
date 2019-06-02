import styled from 'styled-components/native';

import { containerStyles, formStyles } from '../components';

export const StyledTopContainer = styled.View`
  ${props => ({
    ...containerStyles.fixedTop,
    ...containerStyles.fullWidth,
  })}
`;

export const StyledBottomContainer = styled.View`
  ${props => ({
    ...containerStyles.fixedBottom,
    ...containerStyles.fullWidth,
  })}
`;

export const StyledFormContainer = styled.KeyboardAvoidingView.attrs(props => ({
  behavior: 'padding',
}))`
  ${props => ({
    ...formStyles.form,
  })}
`;

export const StyledFormRow = styled.View`
  ${props => ({
    ...formStyles.formItem,
  })}
`;
