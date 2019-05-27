import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Header } from '../../components';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../styled';
import { NavigationService } from '../../utils';
type Props = NavigationScreenProps;

class PasswordForgotScreen extends Component<Props> {
  public render() {
    return (
      <StyledScreenContainer>
        <Header
          text={'What is your email?'}
          message="We'll send a reset code."
        />
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
            <StyledButton onPress={this.onPressReset} label={'Reset'} />
          </StyledFormRow>
        </StyledFormContainer>
      </StyledScreenContainer>
    );
  }

  private onPressReset = () => {
    NavigationService.navigate('Reset');
  };
}

export { PasswordForgotScreen };
