import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { Button } from 'react-native-elements';
import { StyledBoldText, StyledScreenContainer } from '../styled';
import { NavigationService } from '../utils';

const ProfileScreen = () => {
  const handleSignOutAsync = async () => {
    await AsyncStorage.removeItem('userToken');
    NavigationService.navigate('Auth');
  };

  return (
    <StyledScreenContainer>
      <StyledBoldText>PROFILE</StyledBoldText>
      <Button title={'Sign out'} onPress={handleSignOutAsync} type="clear" />
    </StyledScreenContainer>
  );
};

export { ProfileScreen };
