import React from 'react';
import { Alert } from 'react-native';
import { SearchBar } from '../components';
import {
  StyledBoldText,
  StyledScreenContainer,
  StyledTopContainer,
} from '../styled';

const MessagesScreen = () => {
  return (
    <StyledScreenContainer>
      <StyledTopContainer>
        <SearchBar onChangeText={() => Alert.alert('not yet implemented')} />
      </StyledTopContainer>
      <StyledBoldText>MESSAGES</StyledBoldText>
    </StyledScreenContainer>
  );
};

export { MessagesScreen };
