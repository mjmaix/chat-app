import styled from 'styled-components/native';

import {
  FormKeyboardAvoidingView,
  containerStyles,
  formStyles,
} from '../components';
import { DevBorders } from '../utils';

export const StyledFormContainer = styled(FormKeyboardAvoidingView).attrs(
  props => ({
    contentContainerStyle: {
      flexGrow: 1,
      justifyContent: 'center',
    },
  }),
)`
  ${props => ({
    ...formStyles.form,
  })}
`;
