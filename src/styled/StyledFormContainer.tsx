import { KeyboardAvoidingView } from 'react-native';
import { isXSeriesIphone } from 'react-native-iphone-types-helper';
import styled from 'styled-components/native';

import { formStyles } from '../components';

export const StyledFormContainer = styled(KeyboardAvoidingView).attrs(
  props => ({
    behavior: 'position',
    keyboardVerticalOffset: isXSeriesIphone() ? 64 : 0,
  }),
)`
  ${props => ({
    ...formStyles.form,
  })}
`;
