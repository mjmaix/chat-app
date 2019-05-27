import React, { Component } from 'react';
import { Alert, Platform } from 'react-native';
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

class PasswordResetScreen extends Component<Props> {
  public render() {
    const { navigation } = this.props;
    return (
      <StyledScreenContainer>
        <Header text={'Change password'} message="Type in the reset code" />
        <StyledFormContainer>
          <StyledFormRow>
            <StyledTextInput placeholder="Code" />
          </StyledFormRow>
          <StyledFormRow>
            <StyledTextInput
              secureTextEntry
              placeholder="New password"
              keyboardType={
                Platform.OS === 'android' ? 'visible-password' : undefined
              }
            />
          </StyledFormRow>
          <StyledFormRow>
            <StyledButton
              onPress={() => Alert.alert('not yet implemented')}
              label={'Submit'}
            />
          </StyledFormRow>
        </StyledFormContainer>
      </StyledScreenContainer>
    );
  }
}

export { PasswordResetScreen };
