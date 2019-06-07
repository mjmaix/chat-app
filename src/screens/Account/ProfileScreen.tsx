import { Formik, FormikActions, FormikProps } from 'formik';
import React, { Component, Fragment } from 'react';
import {
  NavigationEventSubscription,
  NavigationScreenProps,
} from 'react-navigation';

import { EmailInput, FormikPreviewAvatar } from '../../components';
import {
  ProfileModel,
  StyleGuide,
  UpdateProfileSchema,
  handleCheckVerifiedContact,
  handleGetCurrentUserAttrs,
  handleSignOut,
  handleUpdateProfile,
  handleVerifyContactResend,
  logInfo,
} from '../../core';
import { handlePressVerifyContact } from '../../core/amplify/actions/eventActions';
import { WrapKnownExceptions } from '../../core/errors';
import {
  FormikButtonInjector,
  FormikInputInjector,
  withFormikMemoize,
} from '../../hocs';
import { MemoFormikFormErrorText } from '../../hocs/MemoFormikFormErrorText';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledScrollView,
  StyledTextInput,
  StyledView,
} from '../../styled';
import {
  AsyncImagePicker,
  Busy,
  NavigationService,
  getMime,
} from '../../utils';
import { alertFail, alertOk } from '../../utils';
import {
  asyncGetCurrentUserOpts,
  asyncIsContactVerified,
} from '../../utils/amplifyAuthUtils';

interface Props extends NavigationScreenProps {}
type FormModel = typeof ProfileModel;

const InitialState: {
  verifiedStatus: VerifiedContact | null;
  form: FormModel;
  isFormReady: boolean;
} = {
  verifiedStatus: null,
  isFormReady: false,
  form: { ...ProfileModel },
};

class ProfileScreen extends Component<Props, typeof InitialState> {
  public state = InitialState;
  private willFocusListener?: NavigationEventSubscription;

  public async componentDidMount() {
    asyncGetCurrentUserOpts()
      .then(ops => {
        return handleGetCurrentUserAttrs(ops);
      })
      .then(form => {
        this.setState(prev => ({
          form: { ...prev.form, ...form },
          isFormReady: true,
        }));
      });
    const { navigation } = this.props;
    this.willFocusListener = navigation.addListener('willFocus', () => {
      this.checkVerifiedContact();
    });
  }

  public componentWillUnmount() {
    if (this.willFocusListener) {
      this.willFocusListener.remove();
    }
  }

  private checkVerifiedContact = () => {
    asyncGetCurrentUserOpts()
      .then(opts => handleCheckVerifiedContact(opts))
      .then(verifiedStatus => {
        this.setState({ verifiedStatus });
      });
  };

  private renderAvatar = (fProps: FormikProps<FormModel>) => (
    <FormikPreviewAvatar fProps={fProps} dataKey="picture" />
  );

  private renderExtraButtons = () => {
    const showVerifyEmail = asyncIsContactVerified('email');
    const showVerifyPhone = asyncIsContactVerified('phone_number'); // FIXME: disable since mobile verification always fail Expired
    return (
      <Fragment>
        <StyledButton
          label="Change password"
          onPress={this.handlePressChangePassword}
          type="clear"
        />
        {showVerifyEmail && (
          <StyledButton
            label="Verify email"
            onPress={() => handlePressVerifyContact('email')}
            type="clear"
          />
        )}
        {showVerifyPhone && (
          <StyledButton
            label="Verify mobile"
            onPress={() => handlePressVerifyContact('phone_number')}
            type="clear"
          />
        )}
        <StyledButton
          label="Sign out"
          onPress={this.handleSignOutAsync}
          type="clear"
        />
      </Fragment>
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
                <MemoFormikFormErrorText {...fProps} />
              </StyledFormRow>

              <StyledFormRow>
                <FormikButtonInjector formProps={fProps}>
                  <StyledButton onPress={fProps.handleSubmit} label={'Save'} />
                </FormikButtonInjector>
              </StyledFormRow>

              {this.renderExtraButtons()}
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

  private handlePressVerifyContactResend = async (contact: Contact) => {
    try {
      Busy.start();
      await handleVerifyContactResend(contact);
      alertOk(() => handlePressVerifyContact(contact));
    } catch (err) {
      alertFail(() => null, err);
    } finally {
      Busy.stop();
    }
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
      const newForm: FormModel = { ...form };
      if (picChanged) {
        const mime = getMime(newAttrs.picture);
        const config: StorageConfig = {
          level: 'protected',
          contentType: mime || 'image/jpg',
          progressCallback: ({ loaded, total }) => {
            logInfo(`Uploaded: ${loaded}/${total}`);
          },
        };
        const newPicUrl = await AsyncImagePicker.uploadImage(
          newAttrs.picture,
          config,
        ).catch(WrapKnownExceptions);
        newForm.picture = newPicUrl;
      }
      await handleUpdateProfile(newForm);
      this.checkVerifiedContact();
      alertOk(() => {
        if (emailChanged) {
          this.handlePressVerifyContactResend('email');
        }
      });
    } catch (err) {
      actions.setFieldError('form', err.message);
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
        </StyledScreenContainer>
      </StyledScrollView>
    );
  }
}

export { ProfileScreen };
