import { ConfirmSignUpScreen } from './../screens/Auth/ConfirmSignUpScreen';
import React from 'react';
import { IconObject } from '../components';
import {
  ChatScreen,
  ContactsScreen,
  MessagesScreen,
  PasswordForgotScreen,
  PasswordResetScreen,
  ProfileScreen,
  SettingsScreen,
  SignInScreen,
  SignUpScreen,
  PasswordChangeScreen,
  ResendSignUpScreen,
  BusyOverlayScreen,
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
  Resend: {
    screen: ResendSignUpScreen,
    icon: { name: '', type: 'antdesign' },
  },
  Change: {
    screen: PasswordChangeScreen,
    icon: { name: 'lock', type: 'antdesign' },
  },
  Reset: {
    screen: PasswordResetScreen,
    icon: { name: '', type: 'antdesign' },
  },
  Confirm: {
    screen: ConfirmSignUpScreen,
    icon: { name: '', type: 'antdesign' },
  },
  Busy: {
    screen: BusyOverlayScreen,
    icon: { name: '', type: 'feather' },
  },
  // NOTE: Keep stacks at the bottom
  MessageStack: {
    screen: null,
    icon: { name: 'chat-bubble-outline', type: 'material' },
  },
  MoreStack: {
    screen: null,
    icon: { name: 'user', type: 'feather' },
  },
};
