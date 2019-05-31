import React, { useState, useEffect } from 'react';
import { BaseChallengeScreen } from './Auth/BaseChallengeScreen';
import { NavigationService, alertOk, alertFail, Busy } from '../utils';
import {
  handleVerifyContact,
  handleGetCurrentUserAttrs,
  ChallengeModel,
  EmailModel,
} from '../core';

export const VerifyEmailScreen = () => {
  const [isFormReady, setFormReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    handleGetCurrentUserAttrs({ bypassCache: true }).then(attrs => {
      setEmail(attrs.email);
      setFormReady(true);
    });
  });

  return (
    <BaseChallengeScreen
      title={'Verify email'}
      message={'Provide the code sent to your email.'}
      placeholder={'Code'}
      initialValues={{
        ...ChallengeModel,
        email: email || '',
      }}
      onSubmit={async (values, actions) => {
        try {
          Busy.start();
          await handleVerifyContact('email', values);
          alertOk(() => NavigationService.navigate('Profile'));
        } catch (err) {
          alertFail(() => null, err);
        } finally {
          Busy.stop();
        }
      }}
      disableFields={['email']}
    />
  );
};
