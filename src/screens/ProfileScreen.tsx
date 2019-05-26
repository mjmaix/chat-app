import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { Button } from 'react-native-elements';
import { BoldText, ScreenContainer } from '../styled';
import { NavigationService } from '../utils';

const ProfileScreen = () => {
  const handleSignOutAsync = async () => {
    await AsyncStorage.removeItem('userToken');
    NavigationService.navigate('Auth');
  };

  return (
    <ScreenContainer>
      <BoldText>PROFILE</BoldText>
      <Button title={'Sign out'} onPress={handleSignOutAsync} type="clear" />
    </ScreenContainer>
  );
};

export { ProfileScreen };
