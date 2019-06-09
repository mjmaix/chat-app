import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { IMessage, User } from 'react-native-gifted-chat/lib/types';
import { NavigationScreenProps } from 'react-navigation';
import { ThemedComponentProps } from 'styled-components';

import { StyledScreenContainer } from '../../styled';
import { isLight } from '../../utils';

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
          _id: 4,
          text: 'This is a system message',
          createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
          system: true,
          user: {
            _id: 0,
          },
        },
        {
          _id: 1,
          text: 'Chat message',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/141/141/people',
          },
        },
        {
          _id: 2,
          text: 'Image message',
          createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
          image:
            'https://camo.githubusercontent.com/d77d7a3eafd85abece54e6297f163930e12f3a87/68747470733a2f2f692e696d6775722e636f6d2f6f553758596b6b2e706e67',
        },
      ],
    });
  }
  public render() {
    return (
      <ThemeConsumer>
        {(props: ThemedComponentProps) => {
          const { theme } = props;
          const { colors } = theme;
          return (
            <StyledScreenContainer>
              <View style={styles.giftedChat}>
                <GiftedChat
                  messages={this.state.messages}
                  onSend={messages => this.onSend(messages)}
                  user={this.state.myUser}
                  renderBubble={bubbleProps => {
                    return (
                      <Bubble
                        {...bubbleProps}
                        textStyle={{
                          right: {
                            color: isLight(colors.primarylight)
                              ? colors.primarylighttext
                              : 'white',
                          },
                          left: {
                            color: isLight(colors.secondarylight)
                              ? colors.secondarylighttext
                              : 'white',
                          },
                        }}
                        wrapperStyle={{
                          right: {
                            backgroundColor: colors.primarylight,
                          },
                          left: {
                            backgroundColor: colors.secondarylight,
                          },
                        }}
                      />
                    );
                  }}
                />
              </View>
            </StyledScreenContainer>
          );
        }}
      </ThemeConsumer>
    );
  }

  private onSend(messages: IMessage[] = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
}

const styles = StyleSheet.create({
  giftedChat: {
    ...StyleSheet.absoluteFillObject,
  },
});

export { ChatScreen };
