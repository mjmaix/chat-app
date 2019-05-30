import React from 'react';
import { StyledView } from '../styled';
import { ActivityIndicator } from 'react-native';

export const LoadingOverlayScreen = () => {
  return (
    <StyledView>
      <ActivityIndicator size="large" />
    </StyledView>
  );
};
