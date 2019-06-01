import React from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import {
  StyledScreenContainer,
  StyledBlurredView,
  StyledTopContainer,
} from '../../styled';
import { FixedBackHeader } from '../../components';

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
