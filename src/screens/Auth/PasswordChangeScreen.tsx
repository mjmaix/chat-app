import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Header } from '../../components';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../styled';
type Props = NavigationScreenProps;

class PasswordChangeScreen extends Component<Props> {
  public render() {
    return (
      <StyledScreenContainer>
        <Header text={'Change password'} />
        <StyledFormContainer>
          <StyledFormRow>
            <StyledTextInput placeholder="Old password" secureTextEntry />
          </StyledFormRow>
          <StyledFormRow>
            <StyledTextInput placeholder="New password" secureTextEntry />
          </StyledFormRow>
          <StyledFormRow>
            <StyledTextInput placeholder="Confirm password" secureTextEntry />
          </StyledFormRow>
          <StyledFormRow>
            <StyledButton
              onPress={() => Alert.alert('not yet implemented')}
              label={'Change'}
            />
          </StyledFormRow>
        </StyledFormContainer>
      </StyledScreenContainer>
    );
  }
}

export { PasswordChangeScreen };
