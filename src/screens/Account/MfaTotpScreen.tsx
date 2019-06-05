import { Formik, FormikProps } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Linking, Platform } from 'react-native';
import { Image } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';

import { Header, formStyles } from '../../components';
import {
  CodeRequiredModel,
  MfaSchema,
  ProfileModel,
  handleGetCurrentUserAttrs,
  handleSetupMfaTotp,
} from '../../core';
import { FormikInputInjector, withFormikMemoize } from '../../hocs';
import {
  StyledButton,
  StyledErrorText,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../styled';
import { alertFail, generateTotpLink, getBrandName } from '../../utils';

interface MfaSmsProps {}
type FormModel = typeof CodeRequiredModel;

const { width } = Dimensions.get('window');
const qrCodeSize = width * 0.8;

const renderErrorText = (fProps: FormikProps<FormModel>) => (
  <StyledErrorText message={fProps.errors.form} />
);
const MemoizedErrorText = withFormikMemoize(renderErrorText, 'form', true);

export const MfaTotpScreen = (props: MfaSmsProps) => {
  const [code, setCode] = useState('');
  const [userAttrs, setUserAttrs] = useState<typeof ProfileModel>(ProfileModel);

  useEffect(() => {
    handleGetCurrentUserAttrs().then(setUserAttrs);
  }, []);

  useEffect(() => {
    handleSetupMfaTotp().then(setCode);
  }, []);

  const urlLink = generateTotpLink(userAttrs.email, code, getBrandName());

  return (
    <StyledScreenContainer>
      <Header
        title={'Complete app MFA setup'}
        message={`${Platform.select({
          ios: 'Scan QR code using camera.',
          android: 'Scan QR code with your 2FA app.',
        })}`}
      />

      <Formik<FormModel>
        enableReinitialize
        initialValues={CodeRequiredModel}
        validationSchema={MfaSchema}
        onSubmit={() => alertFail(() => null, 'not yet implemented')}
      >
        {fProps => {
          return (
            <StyledFormContainer>
              <StyledFormRow style={formStyles.formItemImage}>
                <Image
                  PlaceholderContent={
                    !urlLink ? <ActivityIndicator /> : undefined
                  }
                  source={{ uri: 'x' }}
                  ImageComponent={
                    class extends React.Component {
                      public render() {
                        return <QRCode size={qrCodeSize} value={urlLink} />;
                      }
                    }
                  }
                />
              </StyledFormRow>
              <StyledFormRow>
                <StyledButton
                  onPress={() => Linking.openURL(urlLink)}
                  label={'Click to save to a 2FA app'}
                  type="outline"
                />
              </StyledFormRow>
              <StyledFormRow>
                <FormikInputInjector dataKey="code" formProps={fProps}>
                  <StyledTextInput placeholder="MFA code" />
                </FormikInputInjector>
              </StyledFormRow>

              <StyledFormRow>
                <MemoizedErrorText {...fProps} />
              </StyledFormRow>
              <StyledFormRow>
                <StyledButton onPress={fProps.handleSubmit} label={'Verify'} />
              </StyledFormRow>
            </StyledFormContainer>
          );
        }}
      </Formik>
    </StyledScreenContainer>
  );
};
