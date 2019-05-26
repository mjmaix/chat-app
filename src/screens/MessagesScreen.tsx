import React from 'react';
import { Alert } from 'react-native';
import { SearchBar } from '../components/SearchBars/SearchBar';
import { BoldText, ScreenContainer, TopContainer } from '../styled';

const MessagesScreen = () => {
  return (
    <ScreenContainer>
      <TopContainer>
        <SearchBar onChangeText={() => Alert.alert('not yet implemented')} />
      </TopContainer>
      <BoldText>MESSAGES</BoldText>
    </ScreenContainer>
  );
};

export default MessagesScreen;
