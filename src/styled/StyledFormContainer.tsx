import { Platform } from 'react-native';
import { isXSeriesIphone } from 'react-native-iphone-types-helper';
import styled from 'styled-components/native';

import { FormKeyboardAvoidingView, formStyles } from '../components';

export const StyledFormContainer = styled(FormKeyboardAvoidingView)`
  ${props => ({
    ...formStyles.form,
  })}
`;
