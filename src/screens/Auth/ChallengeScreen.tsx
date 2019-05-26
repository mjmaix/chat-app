import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Text } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { FormButton, FormTextInput } from '../../components/Forms';
import { Header } from '../../components/Headers';
import { FormContainer, FormRow, ScreenContainer } from '../../styled';

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
      <ScreenContainer>
        <Header text={this.getDisplayText('title')} />
        <FormContainer>
          <FormRow>
            <Text numberOfLines={3}>{this.getDisplayText('message')}</Text>
          </FormRow>
          <FormRow>
            <FormTextInput
              inputProps={{ placeholder: this.getDisplayText('placeholder') }}
            />
          </FormRow>
          <FormRow>
            <FormButton
              onPress={() => Alert.alert('not yet implemented')}
              label={'Submit'}
            />
          </FormRow>
        </FormContainer>
      </ScreenContainer>
    );
  }

  private getDisplayText = (key: keyof Props) => {
    const { navigation } = this.props;
    const defaultValue: string = this.props[key];
    return navigation.getParam(key) || defaultValue;
  };
}

export default ChallengeScreen;
