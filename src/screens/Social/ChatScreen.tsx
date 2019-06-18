import { filter, first, isEqual, memoize, orderBy } from 'lodash';
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import { IMessage, User } from 'react-native-gifted-chat/lib/types';
import { NavigationScreenProps } from 'react-navigation';
import { ThemedComponentProps } from 'styled-components';

import { ZenObservable } from '../../../node_modules/zen-observable-ts/lib/types';
import { CreateClConvoMutation } from '../../API';
import { ListItemS3ImageAvatar } from '../../components/Lists/ListItemS3ImageAvatar';
import {
  GiftedConvoItem,
  handleCreateConvo,
  handleGetClUser,
  handleGetCurrentUser,
  logInfo,
  subscribeToCreateClMessage,
} from '../../core';
import { handleCreateMessage } from '../../core/actions/mutationActions';
import { handleListClConversations } from '../../core/actions/queryActions';
import {
  mapClMessageToGifted,
  parseConvoToGifted,
} from '../../core/data/giftecChatParser';
import { StyledScreenContainer } from '../../styled';
import { asyncGetS3Link, isLight } from '../../utils';

type Props = NavigationScreenProps;

interface State {
  myUser?: ClUser;
  myAvatar?: string;
  otherUser?: ClUser;
  otherAvatar?: string;
  loading: boolean;
  toggleUser: boolean;
  conversation?: ClConversation;
  messages: GiftedConvoItem[];
}

class ChatScreen extends Component<Props, State> {
  public readonly state: State = {
    loading: true,
    otherUser: undefined,
    myUser: undefined,
    myAvatar: undefined,
    toggleUser: false,
    messages: [],
  };

  private createMessageObserver?: ZenObservable.Subscription;

  public componentWillUmount() {
    if (this.createMessageObserver) {
      this.createMessageObserver.unsubscribe();
    }
  }

  // TODO: for refactoring
  public async componentDidMount() {
    const newState: Partial<State> = {};
    const { navigation } = this.props;
    // section1
    const me = await handleGetCurrentUser();
    const myClUser = await handleGetClUser(me.getUsername());
    if (myClUser && myClUser.getClUser) {
      newState.myUser = myClUser.getClUser as ClUser;
    }

    // section 2
    const user = newState.myUser as ClUser;
    if (user.avatar) {
      const link = await asyncGetS3Link(user.avatar, {
        identityId: user.identityId as string,
        level: 'protected',
      });
      if (link) {
        newState.myAvatar = link as string;
      }
    }

    // section 3
    if (navigation.getParam('selectedUser')) {
      newState.otherUser = navigation.getParam('selectedUser');
    }

    // section 4
    const other = newState.otherUser as ClUser;
    if (other.avatar) {
      const link = await asyncGetS3Link(other.avatar, {
        identityId: other.identityId as string,
        level: 'protected',
      });
      if (link) {
        newState.otherAvatar = link as string;
      }
    }

    // section 5
    if (newState.myUser && newState.otherUser) {
      try {
        const user1 = newState.myUser.id;
        const user2 = newState.otherUser.id;

        let convo = await this.existingConversation(user1, user2);
        if (!convo) {
          const [newConvo, ...others] = await handleCreateConvo(user1, user2);
          if (newConvo) {
            const data = newConvo.data as CreateClConvoMutation;
            convo = data.createClConvo;
          }
        }
        if (convo) {
          const parsedMessage = parseConvoToGifted(convo).messages;
          const parsedMessages = orderBy(
            parsedMessage,
            ['createdAt'],
            ['desc'],
          );

          if (parsedMessages) {
            newState.messages = parsedMessages;
          }
          newState.conversation = convo;
        }
      } catch (err) {
        logInfo('[ERROR] cannot create conversation', err);
      }
    }

    // section 6
    if (newState.conversation) {
      try {
        const convo = newState.conversation;
        this.createMessageObserver = await subscribeToCreateClMessage(
          convo,
          nextData => {
            const clMessage = nextData.data.onCreateClMessage;
            if (clMessage) {
              const newMessage = mapClMessageToGifted(clMessage);
              const exists = filter(
                this.state.messages,
                e => e._id === newMessage._id,
              );
              if (exists.length === 0) {
                this.setState((previous: State) => {
                  const prevMessages = previous.messages as IMessage[];
                  return {
                    messages: GiftedChat.append(prevMessages, [newMessage]),
                  } as State;
                });
              }
            }
          },
        );
      } catch (err) {
        logInfo('[ERROR] cannot subscribe to create message for convo', err);
      }
    }

    this.setState({ ...newState, loading: false } as State);
  }

  private getChatUser = memoize((other?: boolean) => {
    const user = other ? this.state.otherUser : this.state.myUser;
    const link = other ? this.state.otherAvatar : this.state.myAvatar;
    if (!user) {
      return {
        _id: 0,
      };
    }
    const chatMyUser: User = {
      _id: user.id,
      name: `${user.familyName}, ${user.givenName}`,
      avatar: link,
    };
    return chatMyUser;
  });

  private async existingConversation(user1: string, user2: string) {
    let existing = null;
    const convos = await handleListClConversations(user1);
    if (convos && convos.listClConversations) {
      const convoItems = convos.listClConversations.items;
      if (convoItems !== null) {
        const membersConvo = convoItems.filter(c => {
          if (!c) {
            return false;
          }
          // TODO: sort -> extract with mutationAction
          return isEqual(c.members, [user1, user2].sort());
        });
        if (membersConvo.length > 0) {
          existing = first(membersConvo);
        }
      }
    }
    return existing;
  }

  public render() {
    const { myUser, otherUser, loading, conversation, messages } = this.state;
    if (!myUser || loading || !conversation) {
      return <ActivityIndicator />;
    }

    const myChatUser = this.getChatUser(false);

    return (
      <ThemeConsumer>
        {(props: ThemedComponentProps) => {
          const { theme } = props;
          const { colors } = theme;
          return (
            <StyledScreenContainer>
              <View style={styles.giftedChat}>
                <GiftedChat
                  showUserAvatar
                  messages={messages}
                  onSend={m => this.onSend(m)}
                  user={myChatUser}
                  renderAvatar={(avatarProps: any) => {
                    return (
                      <ListItemS3ImageAvatar
                        rounded
                        user={avatarProps.currentMessage.user}
                      />
                    );
                  }}
                  renderSend={sendProps => (
                    <Send
                      {...sendProps}
                      textStyle={{
                        ...sendProps.textStyle,
                        color: colors.primary,
                      }}
                    />
                  )}
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

  private async onSend(messages: IMessage[] = []) {
    const { conversation, myUser } = this.state;
    if (!conversation || !myUser) {
      return null;
    }
    const resp = await handleCreateMessage(myUser, conversation, messages[0]);
    if (resp && resp.data) {
      const respData = resp.data;
      const newMessage = mapClMessageToGifted(respData.createClMessage);

      this.setState((previous: State) => {
        const prevMessages = previous.messages as IMessage[];
        return {
          messages: GiftedChat.append(prevMessages, [newMessage]),
        } as State;
      });
    }
  }
}

const styles = StyleSheet.create({
  giftedChat: {
    ...StyleSheet.absoluteFillObject,
  },
});

export { ChatScreen };
