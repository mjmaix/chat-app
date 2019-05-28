import { Formik } from 'formik';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import * as Yup from 'yup';
import { Header } from '../../components';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormikInput,
  StyledFormRow,
  StyledScreenContainer,
} from '../../styled';

interface ChallengeScreen {
  title: string;
  message?: string;
  placeholder: string;
}
type Props = ChallengeScreen & NavigationScreenProps;
type Model = typeof formikInitialValues;

const ChallengeSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email()
    .required(),
  code: Yup.string()
    .label('Code')
    .email()
    .required('Required'),
});

const formikInitialValues = {
  email: '',
  code: '',
};

class ChallengeScreen extends Component<Props> {
  public static defaultProps = {
    title: 'Challenge question',
    message: '',
    placeholder: 'answer',
  };

  public render() {
    return (
      <StyledScreenContainer>
        <Header
          text={this.getDisplayText('title')}
          message={this.getDisplayText('message')}
        />
        <Formik
          initialValues={formikInitialValues}
          validationSchema={ChallengeSchema}
          onSubmit={(values, actions) => {
            Alert.alert('submit');
            this.onPressSubmit(values);
          }}
        >
          {fProps => {
            return (
              <StyledFormContainer>
                <StyledFormRow>
                  <StyledFormikInput
                    dataKey="email"
                    formProps={fProps}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    textContentType="emailAddress"
                  />
                </StyledFormRow>
                <StyledFormRow>
                  <StyledFormikInput
                    dataKey="code"
                    formProps={fProps}
                    placeholder={this.getDisplayText('placeholder')}
                  />
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

  private getDisplayText = (key: keyof Props) => {
    const { navigation } = this.props;
    const defaultValue: string = this.props[key];
    return navigation.getParam(key) || defaultValue;
  };

  private onPressSubmit = async (form: Model) => {
    Alert.alert('not yet implemented');
  };
}

export { ChallengeScreen };
