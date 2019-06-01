import React from 'react';
import { BaseChallengeScreen } from './Auth/BaseChallengeScreen';
import { NavigationService, alertOk, alertFail } from '../utils';
import { handleConfirmSignUp } from '../core';

export const NewPasswordScreen = () => {
  return (
    <BaseChallengeScreen
      message={'Provide the code sent to your email.'}
      placeholder={'Code'}
      onSubmit={async (values, actions) => {
        try {
          await handleConfirmSignUp(values);
          alertOk(() => NavigationService.navigate('SignIn'));
        } catch (err) {
          alertFail(() => null, err);
        } finally {
          actions.setSubmitting(false);
        }
      }}
    />
  );
};
