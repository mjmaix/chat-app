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

class SignUpScreen extends Component<Props> {
  public render() {
    const { navigation } = this.props;
    return (
      <StyledScreenContainer>
        <Header text={'Sign up'} message="Please fill up the details" />
        <StyledFormContainer>
          <StyledFormRow>
            <StyledTextInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              textContentType="emailAddress"
            />
          </StyledFormRow>
          <StyledFormRow>
            <StyledTextInput
              placeholder="Mobile"
              keyboardType="phone-pad"
              autoCapitalize="none"
              textContentType="telephoneNumber"
            />
          </StyledFormRow>
          <StyledFormRow>
            <StyledTextInput
              placeholder="Password"
              keyboardType={
                Platform.OS === 'android' ? 'visible-password' : undefined
              }
              secureTextEntry
              textContentType="password"
            />
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

export { SignUpScreen };
