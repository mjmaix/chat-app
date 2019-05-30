import React from 'react';
import { BaseChallengeScreen } from './BaseChallengeScreen';
import { NavigationService } from '../../utils';
import { error, handleConfirmSignUp } from '../../core';
import { Alert } from 'react-native';

export const ConfirmSignUpScreen = () => {
  return (
    <BaseChallengeScreen
      title={'Confirm sign up'}
      message={'Provide the code sent to your email.'}
      placeholder={'Code'}
      onSubmit={async (values, actions) => {
        try {
          await handleConfirmSignUp(values);

          Alert.alert('Success', undefined, [
            {
              text: 'OK',
              onPress: () => NavigationService.navigate('SignIn'),
            },
          ]);
        } catch (err) {
          error(err);
          Alert.alert('Oops, failed', JSON.stringify(err));
        }
      }}
    />
  );
};
