import { Storage } from 'aws-amplify';
import { Formik, FormikActions, FormikProps } from 'formik';
import React, { Component } from 'react';

import { FormikPreviewAvatar } from '../../components';
import { EmailInput } from '../../components/Inputs';
import {
  ProfileModel,
  StyleGuide,
  UpdateProfileSchema,
  handleCheckVerifiedContact,
  handleGetCurrentUserAttrs,
  handleSignOut,
  handleUpdateProfile,
  info,
} from '../../core';
import {
  FormikButtonInjector,
  FormikInputInjector,
  withFormikMemoize,
} from '../../hocs';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledScrollView,
  StyledTextInput,
  StyledView,
} from '../../styled';
import { AsyncImagePicker, NavigationService, getMime } from '../../utils';
import { alertFail, alertOk } from '../../utils';

type FormModel = typeof ProfileModel;
const InitialState: {
  verifiedStatus: VerifiedContact | null;
  form: FormModel;
  isFormReady: boolean;
  avatar?: string | null | undefined;
} = {
  verifiedStatus: null,
  isFormReady: false,
  form: { ...ProfileModel },
  avatar: null,
};

class ProfileScreen extends Component<{}, typeof InitialState> {
  public state = InitialState;
  public async componentDidMount() {
    handleGetCurrentUserAttrs({ bypassCache: true })
      .then(form => {
        return Promise.all([
          form,
          Storage.get(form.picture, { level: 'protected' }),
        ]);
      })
      .then(([form, picUrl]) => {
        this.setState({ form, avatar: picUrl as string, isFormReady: true });
      });
    this.checkVerifiedContact();
  }

  private checkVerifiedContact = () => {
    handleCheckVerifiedContact().then(verifiedStatus => {
      this.setState({ verifiedStatus });
    });
  };

  private renderAvatar = (fProps: FormikProps<FormModel>) => (
    <FormikPreviewAvatar
      fProps={fProps}
      dataKey="picture"
      avatar={this.state.avatar}
    />
  );

  private renderExtraButtons = () => {
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
    const MemoizedImageAvatar = withFormikMemoize(this.renderAvatar, 'picture');
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
              <StyledFormRow>
                <StyledView
                  style={{
                    padding: StyleGuide.gap.big,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MemoizedImageAvatar {...fProps} />
                </StyledView>
              </StyledFormRow>
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
    const oldAttrs = this.state.form;
    const newAttrs = form;
    const emailChanged = oldAttrs.email !== newAttrs.email;
    const picChanged = oldAttrs.picture !== newAttrs.picture;

    try {
      const newForm = { ...form };
      const mime = getMime(newAttrs.picture);
      if (picChanged) {
        const config: StorageConfig = {
          level: 'protected',
          contentType: mime,
          progressCallback: ({ loaded, total }) => {
            info(`Uploaded: ${loaded}/${total}`);
          },
        };
        const newPicUrl = await AsyncImagePicker.uploadImage(
          newAttrs.picture,
          config,
        );
        newForm.picture = newPicUrl;
      }
      await handleUpdateProfile(newForm);
      this.checkVerifiedContact();
      alertOk(() => {
        if (emailChanged) {
          NavigationService.navigate('VerifyEmail');
        }
      });
    } catch (err) {
      alertFail(() => null, err);
    } finally {
      actions.setSubmitting(false);
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
