import React from 'react';
import { NavigationRouteConfig } from 'react-navigation';

import { ConfirmSignUpScreen } from './../screens/Auth/ConfirmSignUpScreen';
import { IconObject } from '../components';
import {
  BusyOverlayScreen,
  ChatScreen,
  CompleteNewPasswordScreen,
  ContactsScreen,
  MessagesScreen,
  PasswordChangeScreen,
  PasswordForgotScreen,
  PasswordResetScreen,
  ProfileScreen,
  ResendSignUpScreen,
  SettingsScreen,
  SignInChoicesScreen,
  SignInEmailScreen,
  SignUpScreen,
  VerifyEmailScreen,
} from '../screens';

// TODO: rename to RouteName
export type ScreenName =
  | 'Profile'
  | 'Settings'
  | 'Messages'
  | 'Chat'
  | 'Contacts'
  | 'SignInChoices'
  | 'SignInEmail'
  | 'SignUp'
  | 'Forgot'
  | 'Resend'
  | 'Change'
  | 'CompletePassword'
  | 'Reset'
  | 'Confirm'
  | 'VerifyEmail'
  | 'Busy'
  // parents
  | 'AuthLoading'
  | 'App'
  | 'Auth'
  | 'MessageStack'
  | 'MoreStack';

interface Mapping {
  icon: IconObject;
  screen: React.ReactNode;
}

type Mappings = { [key in ScreenName]: Mapping };

export type StackRouteConfigMap = {
  [key in ScreenName]?: NavigationRouteConfig
};

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
  SignInChoices: {
    screen: SignInChoicesScreen,
    icon: { name: '', type: 'antdesign' },
  },
  SignInEmail: {
    screen: SignInEmailScreen,
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
  CompletePassword: {
    screen: CompleteNewPasswordScreen,
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
  VerifyEmail: {
    screen: VerifyEmailScreen,
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
