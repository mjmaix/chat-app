import { containerStyles, formStyles } from '../components';
import styled from 'styled-components/native';

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
