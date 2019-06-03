import React from 'react';

import { handleConfirmSignUp } from '../../core';
import { Busy, NavigationService, alertFail, alertOk } from '../../utils';
import { BaseChallengeScreen } from '../Base/BaseChallengeScreen';

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
          actions.setFieldError('form', err.message);
          alertFail(() => null, err);
        } finally {
          actions.setSubmitting(false);
          Busy.stop();
        }
      }}
    />
  );
};
