import { Formik, FormikActions } from 'formik';
import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import {CodeInput, EmailInput, Header} from '../../components';
import { ChallengeModel, ChallengeSchema } from '../../core';
import { FormikInputInjector } from '../../hocs';
import {
  StyledButton,
  StyledErrorText,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../styled';

interface OwnProps<T> {
  title?: string;
  message?: string;
  placeholder: string;
  onSubmit: (values: T, formikActions: FormikActions<T>) => Promise<any> | void;
  initialValues?: FormModel;
  disableFields?: [keyof FormModel];
}

type FormModel = typeof ChallengeModel;
type Props<T> = OwnProps<T> & Partial<NavigationScreenProps>;

class BaseChallengeScreen<T extends FormModel> extends Component<Props<T>> {
  private isFieldDisabled = (fieldName: keyof FormModel) => {
    const { disableFields } = this.props;
    if (!disableFields) {
      return false;
    }
    return disableFields.includes(fieldName);
  };

  private renderEmailInput = (props: any) => {
    return <TextInput {...props} editable={!this.isFieldDisabled('email')} />;
  };

  public render() {
    const { title, message, placeholder, initialValues } = this.props;
    return (
      <StyledScreenContainer>
        <Header title={title} message={message} />
        <Formik<T>
          enableReinitialize
          initialValues={{ ...(ChallengeModel as T), ...initialValues }}
          validationSchema={ChallengeSchema}
          onSubmit={(values, actions) => {
            this.props.onSubmit(values, actions);
          }}
        >
          {fProps => {
            return (
              <StyledFormContainer>
                <StyledFormRow>
                  <FormikInputInjector dataKey="email" formProps={fProps}>
                    <StyledTextInput
                      as={EmailInput}
                      inputComponent={this.renderEmailInput}
                    />
                  </FormikInputInjector>
                </StyledFormRow>

                <StyledFormRow>
                  <FormikInputInjector dataKey="code" formProps={fProps}>
                    <StyledTextInput
                      placeholder={placeholder}
                      as={CodeInput}
                    />
                  </FormikInputInjector>
                </StyledFormRow>

                <StyledFormRow>
                  <StyledErrorText message={fProps.errors.form as string} />
                </StyledFormRow>

                <StyledFormRow>
                  <StyledButton
                    onPress={fProps.handleSubmit}
                    label={'Submit'}
                  />
                </StyledFormRow>
              </StyledFormContainer>
            );
          }}
        </Formik>
      </StyledScreenContainer>
    );
  }
}

export { BaseChallengeScreen };
