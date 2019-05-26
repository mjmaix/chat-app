import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { FormButton, FormTextInput } from '../../components/Forms';
import { Header } from '../../components/Headers';
import { FormContainer, FormRow, ScreenContainer } from '../../styled';
type Props = NavigationScreenProps;

class PasswordChangeScreen extends Component<Props> {
  public render() {
    return (
      <ScreenContainer>
        <Header text={'Change password'} />
        <FormContainer>
          <FormRow>
            <FormTextInput
              inputProps={{
                placeholder: 'Old password',
                secureTextEntry: true,
              }}
            />
          </FormRow>
          <FormRow>
            <FormTextInput
              inputProps={{
                placeholder: 'New password',
                secureTextEntry: true,
              }}
            />
          </FormRow>
          <FormRow>
            <FormTextInput
              inputProps={{
                placeholder: 'Confirm password',
                secureTextEntry: true,
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

export default PasswordChangeScreen;
