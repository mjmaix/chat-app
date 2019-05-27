import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Text } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { Header } from '../../components';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormRow,
  StyledScreenContainer,
  StyledTextInput,
} from '../../styled';

interface ChallengeScreen {
  title: string;
  message?: string;
  placeholder: string;
}
type Props = ChallengeScreen & NavigationScreenProps;

class ChallengeScreen extends Component<Props> {
  public static defaultProps = {
    title: 'Challenge question',
    message: '',
    placeholder: 'answer',
  };

  public render() {
    return (
      <StyledScreenContainer>
        <Header text={this.getDisplayText('title')} />
        <StyledFormContainer>
          <StyledFormRow>
            <Text numberOfLines={3}>{this.getDisplayText('message')}</Text>
          </StyledFormRow>
          <StyledFormRow>
            <StyledTextInput placeholder={this.getDisplayText('placeholder')} />
          </StyledFormRow>
          <StyledFormRow>
            <StyledButton
              onPress={() => Alert.alert('not yet implemented')}
              label={'Submit'}
            />
          </StyledFormRow>
        </StyledFormContainer>
      </StyledScreenContainer>
    );
  }

  private getDisplayText = (key: keyof Props) => {
    const { navigation } = this.props;
    const defaultValue: string = this.props[key];
    return navigation.getParam(key) || defaultValue;
  };
}

export { ChallengeScreen };
