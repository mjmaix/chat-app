import './setup';

import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ActivityIndicator } from 'react-native';
import { ThemeProvider as RneThemeProvider } from 'react-native-elements';
import { ThemeProvider as ScThemeProvider } from 'styled-components';

import { ZenObservable } from '../node_modules/zen-observable-ts/lib/types';
import { ListClConversationsQuery, ListClUsersQuery } from './API';
import {
  ClConversationsProvider,
  ClConversationsStoreData,
  ClConversationsStoreInfo,
  ClMessagesProvider,
  ClMessagesStoreData,
  ClMessagesStoreInfo,
  ClUserProvider,
  ClUserStoreInfo,
  STORAGE_KEY,
  Theme,
  ThemeHelper,
  ThemeName,
  handleGetClUser,
  handleGetCurrentUser,
  logError,
} from './core';
import {
  handleListClConversations,
  handleListContacts,
} from './core/actions/queryActions';
import {
  subscribeToCreateClConversation,
  subscribeToCreateClMessage,
  subscribeToCreateClUser,
  subscribeToDeleteClUser,
  subscribeToUpdateClUser,
} from './core/actions/subscriptionActions';
import {
  ClContactsProvider,
  ClContactsStoreData,
  ClContactsStoreInfo,
} from './core/stores/ClContactsStore';
import { AppRoutes } from './routes';
import { apolloClient } from './setup';
import { NavigationService, StoreKeyObjHelper } from './utils';

interface AppState {
  theme: Nullable<Theme>;
  isThemeReady: boolean;
  clUserStoreInfo: ClUserStoreInfo;
  clMessagesStoreInfo: ClMessagesStoreInfo;
  clConversationsStoreInfo: ClConversationsStoreInfo;
  clContactsStoreInfo: ClContactsStoreInfo;
}

export default class App extends Component<{}, AppState> {
  private createMessageObserver?: ZenObservable.Subscription;
  private createContactObserver?: ZenObservable.Subscription;
  private updateContactObserver?: ZenObservable.Subscription;
  private deleteContactObserver?: ZenObservable.Subscription;

  private contactsHelper = new StoreKeyObjHelper<
    ClUser,
    ClContactsStoreData,
    ClContactsStoreInfo
  >('id');

  private messagesHelper = new StoreKeyObjHelper<
    ClMessage,
    ClMessagesStoreData,
    ClMessagesStoreInfo
  >('createdAt');

  private conversationsHelper = new StoreKeyObjHelper<
    ClConversations,
    ClConversationsStoreData,
    ClConversationsStoreInfo
  >('updatedAt');

  public readonly state = {
    theme: ThemeHelper.get(),
    isThemeReady: false,
    clUserStoreInfo: { data: null, isReady: false },
    clMessagesStoreInfo: { data: {}, isReady: false },
    clConversationsStoreInfo: { data: {}, isReady: false },
    clContactsStoreInfo: { data: {}, isReady: false },
  };

  public componentWillMount() {
    ThemeHelper.addListener(theme => this.setState({ theme }));
  }

  public async componentDidMount() {
    this.loadTheme();
    this.loadClUser();
    this.loadSubscribeClMessages();
    this.loadSubscribeClConversation();
    this.loadSubscribeClContacts();
  }

  public componentWillUnmount() {
    ThemeHelper.removeAllListeners();
    if (this.createMessageObserver) {
      this.createMessageObserver.unsubscribe();
    }

    if (this.createContactObserver) {
      this.createContactObserver.unsubscribe();
    }
    if (this.updateContactObserver) {
      this.updateContactObserver.unsubscribe();
    }
    if (this.deleteContactObserver) {
      this.deleteContactObserver.unsubscribe();
    }
  }

  public render() {
    const { isThemeReady } = this.state;
    if (!isThemeReady) {
      return <ActivityIndicator />;
    }
    const {
      theme,
      clUserStoreInfo,
      clMessagesStoreInfo,
      clConversationsStoreInfo,
      clContactsStoreInfo,
    } = this.state;

    return (
      <ApolloProvider client={apolloClient}>
        <ScThemeProvider theme={theme}>
          <RneThemeProvider theme={theme}>
            <ClUserProvider value={clUserStoreInfo}>
              <ClConversationsProvider value={clConversationsStoreInfo}>
                <ClMessagesProvider value={clMessagesStoreInfo}>
                  <ClContactsProvider value={clContactsStoreInfo}>
                    <AppRoutes
                      screenProps={{
                        theme: this.state.theme,
                      }}
                      ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                      }}
                    />
                  </ClContactsProvider>
                </ClMessagesProvider>
              </ClConversationsProvider>
            </ClUserProvider>
          </RneThemeProvider>
        </ScThemeProvider>
      </ApolloProvider>
    );
  }

  private async loadTheme() {
    try {
      const themeId = (await AsyncStorage.getItem(STORAGE_KEY)) as ThemeName;
      if (themeId) {
        ThemeHelper.set(themeId);
        this.setState({ isThemeReady: true, theme: ThemeHelper.get() });
      }
    } catch (err) {
      logError(err);
    } finally {
      this.setState({ isThemeReady: true });
    }
  }

  private async loadClUser() {
    try {
      const user = await handleGetCurrentUser();
      const respClUser = await handleGetClUser(user.getUsername());
      if (respClUser) {
        const clUser = respClUser.getClUser;
        this.setState({ clUserStoreInfo: { isReady: true, data: clUser } });
      }
    } catch (err) {
      logError(err);
    }
  }

  private async loadSubscribeClMessages() {
    const { appendItem } = this.messagesHelper;
    try {
      this.createMessageObserver = await subscribeToCreateClMessage(
        ({ data }) => {
          const clMessage = data.onCreateClMessage;
          if (clMessage) {
            this.setState(prev => ({
              clMessagesStoreInfo: appendItem(
                prev.clMessagesStoreInfo,
                clMessage,
              ),
            }));
          }
        },
      );
    } catch (err) {
      logError(err);
    }
  }

  private async loadSubscribeClConversation() {
    const { appendItem } = this.conversationsHelper;

    await this.loadInitialConversations();

    try {
      this.createMessageObserver = await subscribeToCreateClConversation(
        ({ data }) => {
          const clConversations = data.onCreateClConversation;
          if (clConversations) {
            this.setState(prev => ({
              clConversationsStoreInfo: appendItem(
                prev.clConversationsStoreInfo,
                clConversations,
              ),
            }));
          }
        },
      );
    } catch (err) {
      logError(err);
    }
  }

  private async loadSubscribeClContacts() {
    const user = await handleGetCurrentUser();

    const { appendItem, removeItem } = this.contactsHelper;
    await this.loadInitialContacts();

    this.createContactObserver = await subscribeToCreateClUser(({ data }) => {
      const clUser = data.onCreateClUser;
      if (clUser) {
        this.setState(prev => {
          const clContactsStoreInfo = appendItem(
            prev.clContactsStoreInfo,
            clUser,
          );
          return {
            clContactsStoreInfo,
          };
        });
      }
    });

    this.updateContactObserver = await subscribeToUpdateClUser(({ data }) => {
      const clUser = data.onUpdateClUser;
      // NOTE: workaround to filter result https://github.com/aws-amplify/amplify-js/issues/2817
      if (clUser && user.getUsername() !== clUser.id) {
        this.setState(prev => {
          const clContactsStoreInfo = appendItem(
            prev.clContactsStoreInfo,
            clUser,
          );
          return { clContactsStoreInfo };
        });
      }
    });

    this.deleteContactObserver = await subscribeToDeleteClUser(({ data }) => {
      const clUser = data.onDeleteClUser;
      if (clUser) {
        this.setState(prev => {
          const clContactsStoreInfo = removeItem(
            prev.clContactsStoreInfo,
            clUser,
          );
          return { clContactsStoreInfo };
        });
      }
    });
  }

  private async loadInitialContacts() {
    const { appendList, setReady } = this.contactsHelper;
    const data: ListClUsersQuery | undefined = await handleListContacts();
    let clContactsStoreInfo: ClContactsStoreInfo = {
      isReady: false,
      data: {},
    };
    if (data && data.listClUsers && data.listClUsers.items) {
      const contacts = data.listClUsers.items as ClUser[];
      clContactsStoreInfo = appendList(clContactsStoreInfo, contacts);
      clContactsStoreInfo = setReady(clContactsStoreInfo, true);
      this.setState({ clContactsStoreInfo });
    }
  }

  private async loadInitialConversations() {
    const { appendList, setReady } = this.conversationsHelper;

    const user = await handleGetCurrentUser();

    const data:
      | ListClConversationsQuery
      | undefined = await handleListClConversations(user.getUsername());
    let clConversationsStoreInfo: ClConversationsStoreInfo = {
      isReady: false,
      data: {},
    };
    if (data && data.listClConversations && data.listClConversations.items) {
      const converstaions = data.listClConversations.items as ClConversations[];
      clConversationsStoreInfo = appendList(
        clConversationsStoreInfo,
        converstaions,
      );
      clConversationsStoreInfo = setReady(clConversationsStoreInfo, true);
      this.setState({ clConversationsStoreInfo });
    }
  }
}
