import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { FormButton, FormTextInput } from '../../components/Forms';
import { Header } from '../../components/Headers';
import NavigationService from '../../routes/NavigationService';
import { FormContainer, FormRow, ScreenContainer } from '../../styled';
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

export default PasswordForgotScreen;
