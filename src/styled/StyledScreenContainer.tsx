import styled from 'styled-components/native';

import { containerStyles } from '../components';

export const StyledScreenContainer = styled.SafeAreaView`
  ${props => ({
    ...containerStyles.fullCenter,
  })};
`;
