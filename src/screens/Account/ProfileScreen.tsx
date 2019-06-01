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
} from '../../styled';
import { NavigationService, Busy, AsyncImagePicker } from '../../utils';
import {
  UpdateProfileSchema,
  StyleGuide,
  ProfileModel,
  handleSignOut,
  handleCheckVerifiedContact,
  handleUpdateProfile,
  handleGetCurrentUserAttrs,
} from '../../core';
import { Formik, FormikProps, FormikActions } from 'formik';
import { EmailInput } from '../../components/Inputs';
import {
  FormikInputInjector,
  FormikButtonInjector,
  withFormikImage,
  WithFormikConfig,
} from '../../hocs';
import { alertFail, alertOk } from '../../utils';
import { Alert } from 'react-native';
import { Storage } from 'aws-amplify';
import { PreviewAvatar, PreviewAvatarProps } from '../../components';

type FormModel = typeof ProfileModel;
const InitialState: {
  verifiedStatus: VerifiedContact | null;
  form: FormModel;
  isFormReady: boolean;
} = {
  verifiedStatus: null,
  isFormReady: false,
  form: { ...ProfileModel, picture: 'https://placeimg.com/480/480/people' },
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
      <Formik<FormModel>
        enableReinitialize
        initialValues={this.state.form}
        validationSchema={UpdateProfileSchema}
        onSubmit={this.onSave}
      >
        {fProps => {
          return (
            <StyledFormContainer>
              {this.renderAvatar(fProps)}
              <StyledFormRow>
                <FormikInputInjector dataKey="email" formProps={fProps}>
                  <StyledTextInput
                    as={EmailInput}
                    label="Email"
                    placeholder=""
                  />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <FormikInputInjector dataKey="phoneNumber" formProps={fProps}>
                  <StyledTextInput
                    label="Mobile"
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    textContentType="telephoneNumber"
                  />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <FormikInputInjector dataKey="givenName" formProps={fProps}>
                  <StyledTextInput
                    label="Given name"
                    textContentType="givenName"
                  />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <FormikInputInjector dataKey="familyName" formProps={fProps}>
                  <StyledTextInput
                    label="Family name"
                    textContentType="familyName"
                  />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <FormikButtonInjector formProps={fProps}>
                  <StyledButton onPress={fProps.handleSubmit} label={'Save'} />
                </FormikButtonInjector>
              </StyledFormRow>
            </StyledFormContainer>
          );
        }}
      </Formik>
    );
  };

  private renderAvatar = (fProps: FormikProps<FormModel>) => {
    const FormikImageWrapper = withFormikImage<FormModel>(PreviewAvatar, {
      dataKey: 'picture',
      formProps: fProps,
    });
    return (
      <StyledFormRow>
        <StyledView
          style={{
            padding: StyleGuide.gap.big,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FormikImageWrapper />
        </StyledView>
      </StyledFormRow>
    );
  };

  private handleUploadAvatar = async () => {
    try {
      const avatarPicker = new AsyncImagePicker();
      const pickResponse = await avatarPicker.pickImage();
      console.log('pickResponse', pickResponse);
      const uploadResponse = await avatarPicker.uploadImage();
      console.log('uploadReponse', uploadResponse);
    } catch (err) {
      console.error(err);
    }
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

  private onSave = async <T extends FormModel>(
    form: T,
    actions: FormikActions<T>,
  ) => {
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
      actions.setSubmitting(false);
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
          {this.renderForm()}
          {this.renderExtraButtons()}
        </StyledScreenContainer>
      </StyledScrollView>
    );
  }
}

export { ProfileScreen };
