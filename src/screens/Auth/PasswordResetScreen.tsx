import React, { Component } from 'react';
import { Alert, Platform } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { FormButton, FormTextInput, Header } from '../../components';
import { FormContainer, FormRow, ScreenContainer } from '../../styled';
type Props = NavigationScreenProps;

class PasswordResetScreen extends Component<Props> {
  public render() {
    const { navigation } = this.props;
    return (
      <ScreenContainer>
        <Header text={'Change password'} message="Type in the reset code" />
        <FormContainer>
          <FormRow>
            <FormTextInput inputProps={{ placeholder: 'Code' }} />
          </FormRow>
          <FormRow>
            <FormTextInput
              inputProps={{
                placeholder: 'New password',
                secureTextEntry: true,
                keyboardType:
                  Platform.OS === 'android' ? 'visible-password' : undefined,
              }}
            />
          </FormRow>
          <FormRow>
            <FormButton
              onPress={() => Alert.alert('not yet implemented')}
              label={'Submit'}
            />
          </FormRow>
        </FormContainer>
      </ScreenContainer>
    );
  }
}

export { PasswordResetScreen };

