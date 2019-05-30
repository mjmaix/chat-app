import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
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
import { NavigationService } from '../utils';
import { UpdateProfileSchema, StyleGuide, ProfileModel } from '../core';
import { Formik } from 'formik';
import { EmailInput } from '../components/Inputs';
import { Alert } from 'react-native';
import { FormikInputWrapper } from '../hocs';

type FormModel = typeof ProfileModel;

const ProfileScreen = () => {
  const handleSignOutAsync = async () => {
    await AsyncStorage.removeItem('userToken');
    NavigationService.navigate('Auth');
  };
  const handlePressChangePassword = () => {
    NavigationService.navigate('Change');
  };

  const onPressSignUp = (form: FormModel) => {
    Alert.alert('not yet implemented');
  };

  return (
    <StyledScrollView>
      <StyledScreenContainer
        style={{
          justifyContent: 'space-between',
        }}
      >
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
        <Formik
          initialValues={ProfileModel}
          validationSchema={UpdateProfileSchema}
          onSubmit={(values, actions) => {
            onPressSignUp(values);
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
                  <StyledButton onPress={fProps.handleSubmit} label={'Save'} />
                </StyledFormRow>
              </StyledFormContainer>
            );
          }}
        </Formik>
        <StyledView>
          <StyledButton
            label="Change password"
            onPress={handlePressChangePassword}
            type="clear"
          />
          <StyledButton
            label="Sign out"
            onPress={handleSignOutAsync}
            type="clear"
          />
        </StyledView>
      </StyledScreenContainer>
    </StyledScrollView>
  );
};

export { ProfileScreen };
