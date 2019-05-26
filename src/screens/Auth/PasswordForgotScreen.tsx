import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { FormButton, FormTextInput, Header } from '../../components';
import { FormContainer, FormRow, ScreenContainer } from '../../styled';
import { NavigationService } from '../../utils';
type Props = NavigationScreenProps;

class PasswordForgotScreen extends Component<Props> {
  public render() {
    const { navigation } = this.props;
    return (
      <ScreenContainer>
        <Header
          text={'What is your email?'}
          message="We'll send a reset code."
        />
        <FormContainer>
          <FormRow>
            <FormTextInput
              inputProps={{
                placeholder: 'Email',
                keyboardType: 'email-address',
                autoCapitalize: 'none',
                textContentType: 'emailAddress',
              }}
            />
          </FormRow>

          <FormRow>
            <FormButton onPress={this.onPressReset} label={'Reset'} />
          </FormRow>
        </FormContainer>
      </ScreenContainer>
    );
  }

  private onPressReset = () => {
    NavigationService.navigate('Reset');
  };
}

export { PasswordForgotScreen };
