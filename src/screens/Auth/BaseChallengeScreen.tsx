import { Formik, FormikActions } from 'formik';
import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Header } from '../../components';
import { EmailInput } from '../../components/Inputs';
import { ChallengeSchema, ChallengeModel } from '../../core';
import { FormikInputWrapper } from '../../hocs';
import {
  StyledButton,
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
}

type FormModel = typeof ChallengeModel;
type Props<T> = OwnProps<T> & Partial<NavigationScreenProps>;

class BaseChallengeScreen<T extends FormModel> extends Component<Props<T>> {
  public render() {
    const { title, message, placeholder } = this.props;
    return (
      <StyledScreenContainer>
        {(title || message) && <Header title={title} message={message} />}
        <Formik<T>
          initialValues={ChallengeModel as T}
          validationSchema={ChallengeSchema}
          onSubmit={(values, actions) => {
            this.props.onSubmit(values, actions);
          }}
        >
          {fProps => {
            return (
              <StyledFormContainer>
                <StyledFormRow>
                  <FormikInputWrapper dataKey="email" formProps={fProps}>
                    <StyledTextInput as={EmailInput} />
                  </FormikInputWrapper>
                </StyledFormRow>
                <StyledFormRow>
                  <FormikInputWrapper dataKey="code" formProps={fProps}>
                    <StyledTextInput placeholder={placeholder} />
                  </FormikInputWrapper>
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
