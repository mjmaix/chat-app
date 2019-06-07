import React, { useEffect, useState } from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { ChallengeModel, handleConfirmSignUp } from '../../core';
import { Busy, NavigationService, alertFail, alertOk } from '../../utils';
import { BaseChallengeScreen } from '../Base/BaseChallengeScreen';

interface Props extends NavigationScreenProps {}

export const ConfirmSignUpScreen = (props: Props) => {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const { navigation } = props;
    const paramEmail = navigation.getParam('email');
    if (paramEmail) {
      setEmail(paramEmail);
    }
  }, []);
  return (
    <BaseChallengeScreen
      title={'Confirm sign up'}
      message={'Provide the code sent to your email.'}
      placeholder={'Code'}
      disableFields={email ? [email] : undefined}
      initialValues={{ ...ChallengeModel, email }}
      onSubmit={async (values, actions) => {
        try {
          Busy.start();
          await handleConfirmSignUp(values);
          alertOk(() => NavigationService.navigate('SignInEmail'));
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
