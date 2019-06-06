import { Formik, FormikActions } from 'formik';
import React, { useEffect, useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { CodeInput } from '../../components';
import {
  ChallengeModel,
  VerifyContactModel,
  VerifyContactSchema,
  handleVerifyContact,
  handleVerifyContactResend,
} from '../../core';
import { FormikInputInjector } from '../../hocs';
import { MemoFormikFormErrorText } from '../../hocs/MemoFormikFormErrorText';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../styled';
import { Busy, NavigationService, alertFail, alertOk } from '../../utils';

interface VerifyContactScreenProps extends NavigationScreenProps {}
type FormModel = typeof ChallengeModel;

const onSubmit = async (
  values: FormModel,
  actions: FormikActions<FormModel>,
) => {
  try {
    await handleVerifyContact('email', values);
    alertOk(() => NavigationService.navigate('Profile'));
  } catch (err) {
    actions.setFieldError('form', err.message);
    alertFail(() => null, err);
  } finally {
    actions.setSubmitting(false);
  }
};

const handlePressVerifyContactResend = async (contact: Contact) => {
  try {
    Busy.start();
    await handleVerifyContactResend(contact);
    alertOk(() => null);
  } catch (err) {
    alertFail(() => null, err);
  } finally {
    Busy.stop();
  }
};

export const VerifyContactScreen = (props: VerifyContactScreenProps) => {
  const [contact, setContact] = useState<Contact>('email');
  const [contactValue, setContactValue] = useState<string>('');

  useEffect(() => {
    const { navigation } = props;
    setContact(navigation.getParam('contact'));
    setContactValue(navigation.getParam('contactValue'));
  });

  if (!contactValue && !contact) {
    return null;
  }

  const showVerifyEmail = contact === 'email';
  const showVerifyPhone = contact === 'phone_number';

  return (
    <StyledScreenContainer>
      <Formik<FormModel>
        enableReinitialize
        initialValues={{
          ...VerifyContactModel,
          [contact as string]: contactValue,
        }}
        validationSchema={VerifyContactSchema}
        onSubmit={(values, actions) => {
          onSubmit(values, actions);
        }}
      >
        {fProps => {
          return (
            <StyledFormContainer>
              <StyledFormRow>
                <FormikInputInjector
                  dataKey={contact as string}
                  formProps={fProps}
                >
                  <StyledTextInput
                    inputComponent={
                      // NOTE: avoid nasty forwardReft runtime exception, use class
                      class extends React.Component<TextInputProps> {
                        public render() {
                          return <TextInput {...this.props} editable={false} />;
                        }
                      }
                    }
                  />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <FormikInputInjector dataKey="code" formProps={fProps}>
                  <StyledTextInput as={CodeInput} />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <MemoFormikFormErrorText {...fProps} />
              </StyledFormRow>

              <StyledFormRow>
                <StyledButton onPress={fProps.handleSubmit} label={'Submit'} />
              </StyledFormRow>

              {showVerifyEmail && (
                <StyledButton
                  label="Resend email code"
                  onPress={() => handlePressVerifyContactResend('email')}
                  type="clear"
                />
              )}
              {showVerifyPhone && (
                <StyledButton
                  label="Resend phone code"
                  onPress={() => handlePressVerifyContactResend('phone_number')}
                  type="clear"
                />
              )}
            </StyledFormContainer>
          );
        }}
      </Formik>
    </StyledScreenContainer>
  );
};
