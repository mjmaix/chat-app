import { Formik, FormikActions } from 'formik';
import React, { useEffect, useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { Header } from '../../components';
import { EmailInput } from '../../components/Inputs';
import {
  ChallengeModel,
  VerifyContactModel,
  VerifyContactSchema,
  handleVerifyContact,
} from '../../core';
import { FormikInputInjector } from '../../hocs';
import {
  StyledButton,
  StyledErrorText,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../styled';
import { NavigationService, alertFail, alertOk } from '../../utils';

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
                  <StyledTextInput placeholder={'Code'} />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <StyledErrorText message={fProps.errors.form as string} />
              </StyledFormRow>

              <StyledFormRow>
                <StyledButton onPress={fProps.handleSubmit} label={'Submit'} />
              </StyledFormRow>
            </StyledFormContainer>
          );
        }}
      </Formik>
    </StyledScreenContainer>
  );
};
