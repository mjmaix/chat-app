import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import { IMessage } from 'react-native-gifted-chat/lib/types';
import { NavigationScreenProps } from 'react-navigation';
import { ScreenThemeProps } from '../core/themes';

type Props = ScreenThemeProps & NavigationScreenProps;

interface State {
  messages: IMessage[];
}

class ChatScreen extends Component<Props, State> {
  public readonly state = {
    messages: [],
  };

  public componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/people',
          },
        },
      ],
    });
  }
  public render() {
    const { theme, navigation } = this.props;
    return (
      <View
        style={[
          styles.container,

          {
            backgroundColor: theme.colors.backgroundColor,
          },
        ]}
      >
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }

  private onSend(messages: IMessage[] = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default withTheme(ChatScreen);
