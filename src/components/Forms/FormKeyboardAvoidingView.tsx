import React, { Component } from 'react';
import {
  EmitterSubscription,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { isXSeriesIphone } from 'react-native-iphone-types-helper';

interface FormKeyboardAvoidingViewProps {
  children: Element[];
  style?: any;
}

interface FormKeyboardAvoidingViewState {
  keyboardUp: boolean;
}
export class FormKeyboardAvoidingView extends Component<
  FormKeyboardAvoidingViewProps,
  FormKeyboardAvoidingViewState
> {
  private showListener?: Nullable<EmitterSubscription>;
  private hideListener?: Nullable<EmitterSubscription>;

  public readonly state = {
    keyboardUp: false,
  };

  public componentWillMount() {
    this.showListener = Keyboard.addListener(
      Platform.select({ ios: 'keyboardWillShow', android: 'keyboardDidShow' }),
      this.keyboardDidShow.bind(this),
    );
    this.hideListener = Keyboard.addListener(
      Platform.select({ ios: 'keyboardWillHide', android: 'keyboardDidHide' }),
      this.keyboardDidHide.bind(this),
    );
  }

  public componentWillUnmount() {
    if (this.showListener) {
      this.showListener.remove();
    }
    if (this.hideListener) {
      this.hideListener.remove();
    }
  }

  public keyboardDidShow() {
    this.setState({ keyboardUp: true });
  }

  public keyboardDidHide() {
    this.setState({ keyboardUp: false });
  }

  public render() {
    const { children, style } = this.props;
    const { keyboardUp } = this.state;
    const keyboardPadding = {
      paddingTop: keyboardUp ? 150 : 0,
    };
    return (
      <KeyboardAvoidingView
        style={[style, keyboardPadding]}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        keyboardVerticalOffset={isXSeriesIphone() ? 64 : 0}
      >
        {children}
      </KeyboardAvoidingView>
    );
  }
}
