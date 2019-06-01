import React from 'react';
import { BaseChallengeScreen } from './BaseChallengeScreen';
import { NavigationService, alertOk, alertFail, Busy } from '../../utils';
import { handleConfirmSignUp } from '../../core';

export const ConfirmSignUpScreen = () => {
  return (
    <BaseChallengeScreen
      title={'Confirm sign up'}
      message={'Provide the code sent to your email.'}
      placeholder={'Code'}
      onSubmit={async (values, actions) => {
        try {
          Busy.start();
          await handleConfirmSignUp(values);
          alertOk(() => NavigationService.navigate('SignIn'));
        } catch (err) {
          alertFail(() => null, err);
        } finally {
          actions.setSubmitting(false);
          Busy.stop();
        }
      }}
    />
  );
};
