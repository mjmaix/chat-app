import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { IMessage, User } from 'react-native-gifted-chat/lib/types';
import { NavigationScreenProps } from 'react-navigation';
import { containerStyles } from '../components/commonStyles';

type Props = NavigationScreenProps;

interface State {
  messages: IMessage[];
  myUser: User;
}

class ChatScreen extends Component<Props, State> {
  public readonly state = {
    messages: [],
    myUser: {
      _id: 1,
      name: 'You',
      avatar: 'https://placeimg.com/140/140/people',
    },
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
            avatar: 'https://placeimg.com/141/141/people',
          },
        },
      ],
    });
  }
  public render() {
    return (
      <View style={[styles.themed, styles.giftedChatContainer]}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={this.state.myUser}
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
  ...containerStyles,
  giftedChatContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default ChatScreen;
