import React from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';

import { FixedBackHeader } from '../../components';
import {
  StyledBlurredView,
  StyledScreenContainer,
  StyledTopContainer,
} from '../../styled';

export const BusyOverlayScreen = () => {
  return (
    <StyledBlurredView>
      <StyledTopContainer>
        <FixedBackHeader iconProps={{ name: 'close', type: 'antdesign' }} />
      </StyledTopContainer>
      <ActivityIndicator size="large" />
    </StyledBlurredView>
  );
};
