import React, { Component } from 'react';
import { Avatar } from 'react-native-elements';
import {
  StyledScreenContainer,
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledTextInput,
  StyledScrollView,
  StyledView,
} from '../styled';
import { NavigationService, Busy } from '../utils';
import {
  UpdateProfileSchema,
  StyleGuide,
  ProfileModel,
  handleSignOut,
  handleCheckVerifiedContact,
  handleUpdateProfile,
  handleGetCurrentUserAttrs,
} from '../core';
import { Formik } from 'formik';
import { EmailInput } from '../components/Inputs';
import { FormikInputWrapper, FormikButtonWrapper } from '../hocs';
import { alertFail, alertOk } from '../utils';
import { Alert } from 'react-native';

type FormModel = typeof ProfileModel;
const InitialState: {
  verifiedStatus: VerifiedContact | null;
  form: FormModel;
  isFormReady: boolean;
} = {
  verifiedStatus: null,
  isFormReady: false,
  form: ProfileModel,
};

class ProfileScreen extends Component<{}, typeof InitialState> {
  public state = InitialState;
  public async componentDidMount() {
    handleGetCurrentUserAttrs({ bypassCache: true }).then((form: FormModel) => {
      this.setState({ form, isFormReady: true });
    });
    this.checkVerifiedContact();
  }

  private checkVerifiedContact = () => {
    handleCheckVerifiedContact().then(verifiedStatus => {
      this.setState({ verifiedStatus });
    });
  };

  public renderExtraButtons = () => {
    const status = this.state.verifiedStatus;
    const showVerifyEmail = !!(
      status &&
      status.unverified &&
      status.unverified.email
    );
    return (
      <StyledView>
        <StyledButton
          label="Change password"
          onPress={this.handlePressChangePassword}
          type="clear"
        />
        {showVerifyEmail && (
          <StyledButton
            label="Verify email"
            onPress={this.handlePressVerifyEmail}
            type="clear"
          />
        )}
        <StyledButton
          label="Sign out"
          onPress={this.handleSignOutAsync}
          type="clear"
        />
      </StyledView>
    );
  };

  private renderForm = () => {
    return (
      <Formik
        enableReinitialize
        initialValues={this.state.form}
        validationSchema={UpdateProfileSchema}
        onSubmit={(values, actions) => {
          this.onSave(values);
        }}
      >
        {fProps => {
          return (
            <StyledFormContainer>
              <StyledFormRow>
                <FormikInputWrapper dataKey="email" formProps={fProps}>
                  <StyledTextInput
                    as={EmailInput}
                    label="Email"
                    placeholder=""
                  />
                </FormikInputWrapper>
              </StyledFormRow>

              <StyledFormRow>
                <FormikInputWrapper dataKey="phoneNumber" formProps={fProps}>
                  <StyledTextInput
                    label="Mobile"
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    textContentType="telephoneNumber"
                  />
                </FormikInputWrapper>
              </StyledFormRow>

              <StyledFormRow>
                <FormikInputWrapper dataKey="givenName" formProps={fProps}>
                  <StyledTextInput
                    label="Given name"
                    textContentType="givenName"
                  />
                </FormikInputWrapper>
              </StyledFormRow>

              <StyledFormRow>
                <FormikInputWrapper dataKey="familyName" formProps={fProps}>
                  <StyledTextInput
                    label="Family name"
                    textContentType="familyName"
                  />
                </FormikInputWrapper>
              </StyledFormRow>

              <StyledFormRow>
                <FormikButtonWrapper formProps={fProps}>
                  <StyledButton onPress={fProps.handleSubmit} label={'Save'} />
                </FormikButtonWrapper>
              </StyledFormRow>
            </StyledFormContainer>
          );
        }}
      </Formik>
    );
  };

  private renderAvatar = () => {
    return (
      <Avatar
        rounded
        showEditButton
        icon={{
          name: 'user',
          type: 'feather',
        }}
        size="xlarge"
        source={{ uri: 'https://placeimg.com/480/480/people' }}
        onEditPress={() => Alert.alert('not yet implemented')}
        containerStyle={{
          padding: StyleGuide.gap.big,
        }}
      />
    );
  };

  private handleSignOutAsync = async () => {
    try {
      await handleSignOut();
      alertOk(() => NavigationService.navigate('Auth'));
    } catch (err) {
      alertFail(() => null, err);
    }
  };

  private handlePressChangePassword = () => {
    NavigationService.navigate('Change');
  };

  private handlePressVerifyEmail = () => {
    NavigationService.navigate('VerifyEmail');
  };

  private onSave = async (form: FormModel) => {
    try {
      Busy.start();
      await handleUpdateProfile(form);
      this.checkVerifiedContact();
      alertOk(() => {
        const oldAttrs = this.state.form;
        const newAttrs = form;
        if (oldAttrs.email !== newAttrs.email) {
          NavigationService.navigate('VerifyEmail');
        }
      });
    } catch (err) {
      alertFail(() => null, err);
    } finally {
      Busy.stop();
    }
  };

  public render() {
    return (
      <StyledScrollView>
        <StyledScreenContainer
          style={{
            justifyContent: 'space-between',
          }}
        >
          {this.renderAvatar()}
          {this.renderForm()}
          {this.renderExtraButtons()}
        </StyledScreenContainer>
      </StyledScrollView>
    );
  }
}

export { ProfileScreen };
