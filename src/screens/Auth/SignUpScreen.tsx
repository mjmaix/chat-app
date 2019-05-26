import React, { Component } from 'react';
import { Alert, Platform } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { FormButton, FormTextInput, Header } from '../../components';
import { FormContainer, FormRow, ScreenContainer } from '../../styled';
type Props = NavigationScreenProps;

class SignUpScreen extends Component<Props> {
  public render() {
    const { navigation } = this.props;
    return (
      <ScreenContainer>
        <Header text={'Sign up'} message="Please fill up the details" />
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
            <FormTextInput
              inputProps={{
                placeholder: 'Mobile',
                keyboardType: 'phone-pad',
                autoCapitalize: 'none',
                textContentType: 'telephoneNumber',
              }}
            />
          </FormRow>
          <FormRow>
            <FormTextInput
              inputProps={{
                placeholder: 'Password',
                keyboardType:
                  Platform.OS === 'android' ? 'visible-password' : undefined,

                secureTextEntry: true,
                textContentType: 'password',
              }}
            />
          </FormRow>
          <FormRow>
            <FormButton
              onPress={() => Alert.alert('not yet implemented')}
              label={'Change'}
            />
          </FormRow>
        </FormContainer>
      </ScreenContainer>
    );
  }
}

export { SignUpScreen };

