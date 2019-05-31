import React from 'react';
import { BaseChallengeScreen } from './Auth/BaseChallengeScreen';
import { NavigationService, alertOk, alertFail, Busy } from '../utils';
import { handleVerifyEmail } from '../core';

export const VerifyEmailScreen = () => {
  return (
    <BaseChallengeScreen
      title={'Verify email'}
      message={'Provide the code sent to your email.'}
      placeholder={'Code'}
      onSubmit={async (values, actions) => {
        try {
          Busy.start();
          await handleVerifyEmail(values);
          alertOk(() => NavigationService.navigate('Profile'));
        } catch (err) {
          alertFail(() => null, err);
        } finally {
          Busy.stop();
        }
      }}
    />
  );
};
