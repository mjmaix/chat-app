import React, { Component, Fragment } from 'react';
import { EmitterSubscription, Keyboard, Platform, View } from 'react-native';

interface WithKeyboardHideProps {}

interface WithKeyboardHideState {
  keyboardUp: boolean;
}

class WithKeyboardHide extends Component<
  WithKeyboardHideProps,
  WithKeyboardHideState
> {
  private showListener?: Nullable<EmitterSubscription>;
  private hideListener?: Nullable<EmitterSubscription>;

  public readonly state = {
    keyboardUp: false,
  };

  public componentWillMount() {
    this.showListener = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardDidShow.bind(this),
    );
    this.hideListener = Keyboard.addListener(
      'keyboardWillHide',
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
    this.setState({
      keyboardUp: true,
    });
  }

  public keyboardDidHide() {
    this.setState({
      keyboardUp: false,
    });
  }

  public render() {
    if (this.state.keyboardUp) {
      return <View />;
    }
    const { children, ...props2 } = this.props;

    return <Fragment {...props2}>{children}</Fragment>;
  }
}

export { WithKeyboardHide };
