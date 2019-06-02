import React, { useEffect, useState } from 'react';

import {
  ChallengeModel,
  handleGetCurrentUserAttrs,
  handleVerifyContact,
} from '../../core';
import { NavigationService, alertFail, alertOk } from '../../utils';
import { BaseChallengeScreen } from '../Base/BaseChallengeScreen';

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
          await handleVerifyContact('email', values);
          alertOk(() => NavigationService.navigate('Profile'));
        } catch (err) {
          alertFail(() => null, err);
        } finally {
          actions.setSubmitting(false);
        }
      }}
      disableFields={['email']}
    />
  );
};
