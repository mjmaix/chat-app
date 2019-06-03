import React, { Component } from 'react';
import { Image, ImageBackground } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import BannerImage from '../../../assets/icon_raw.jpg';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormOverImageContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledView,
} from '../../styled';
import { NavigationService } from '../../utils';

type Props = NavigationScreenProps;

class SignInChoicesScreen extends Component<Props> {
  public render() {
    return (
      <ImageBackground
        source={Image.resolveAssetSource(BannerImage)}
        resizeMode="stretch"
        style={{
          flex: 1,
        }}
      >
        <StyledScreenContainer>
          <StyledFormOverImageContainer>
            <StyledFormContainer
              as={StyledView} /* prevent scroll but retain form style*/
            >
              <StyledFormRow>
                <StyledButton
                  onPress={this.onPressSignInWithEmail}
                  label={'Sign in with email'}
                />
              </StyledFormRow>

              <StyledFormRow>
                <StyledButton
                  onPress={this.onPressSignUp}
                  label={'Sign up'}
                  type="outline"
                />
              </StyledFormRow>

              <StyledFormRow>
                <StyledButton
                  onPress={this.onPressForgotPassword}
                  label={'Forgot password?'}
                  type="clear"
                />
              </StyledFormRow>
            </StyledFormContainer>
          </StyledFormOverImageContainer>
        </StyledScreenContainer>
      </ImageBackground>
    );
  }

  private onPressSignInWithEmail = () => {
    NavigationService.navigate('SignInEmail');
  };

  private onPressSignUp = () => {
    NavigationService.navigate('SignUp');
  };

  private onPressForgotPassword = () => {
    NavigationService.navigate('Forgot');
  };
}

export { SignInChoicesScreen };
