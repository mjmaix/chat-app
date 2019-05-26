import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { Button } from 'react-native-elements';
import NavigationService from '../routes/NavigationService';
import { BoldText, ScreenContainer } from '../styled';

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

export default ProfileScreen;
