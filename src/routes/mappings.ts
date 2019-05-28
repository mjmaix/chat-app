import React from 'react';
import { IconObject } from '../components';
import {
  ChallengeScreen,
  ChatScreen,
  ContactsScreen,
  MessagesScreen,
  PasswordForgotScreen,
  PasswordResetScreen,
  ProfileScreen,
  SettingsScreen,
  SignInScreen,
  SignUpScreen,
} from '../screens';

interface Mapping {
  icon: IconObject;
  screen: React.ReactNode;
}

interface Mappings {
  [routeName: string]: Mapping;
}

export const Mappings: Mappings = {
  Profile: {
    screen: ProfileScreen,
    icon: { name: 'user', type: 'feather' },
  },
  Settings: {
    screen: SettingsScreen,
    icon: { type: 'antdesign', name: 'setting' },
  },
  Messages: {
    screen: MessagesScreen,
    icon: { name: 'mail', type: 'feather' },
  },
  Chat: {
    screen: ChatScreen,
    icon: { name: 'message1', type: 'antdesign' },
  },
  Contacts: {
    screen: ContactsScreen,
    icon: { name: 'contacts', type: 'antdesign' },
  },
  SignIn: {
    screen: SignInScreen,
    icon: { name: '', type: 'antdesign' },
  },
  SignUp: {
    screen: SignUpScreen,
    icon: { name: '', type: 'antdesign' },
  },
  Forgot: {
    screen: PasswordForgotScreen,
    icon: { name: '', type: 'antdesign' },
  },
  Reset: {
    screen: PasswordResetScreen,
    icon: { name: '', type: 'antdesign' },
  },
  Confirm: {
    screen: ChallengeScreen,
    icon: { name: '', type: 'antdesign' },
  },
  MessageStack: {
    screen: null,
    icon: { name: 'chat-bubble-outline', type: 'material' },
  },
  MoreStack: {
    screen: null,
    icon: { name: 'user', type: 'feather' },
  },
};
