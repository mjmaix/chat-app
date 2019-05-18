import React from 'react';
import ChallengeScreen from '../screens/Auth/ChallengeScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import ChatScreen from '../screens/ChatScreen';
import ContactsScreen from '../screens/ContactsScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { IconObject } from './../components/icons/index';

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
    icon: { name: 'user', type: 'AntDesign' },
  },
  Settings: {
    screen: SettingsScreen,
    icon: { type: 'AntDesign', name: 'setting' },
  },
  Messages: {
    screen: MessagesScreen,
    icon: { name: 'mail', type: 'Feather' },
  },
  Chat: {
    screen: ChatScreen,
    icon: { name: 'message1', type: 'AntDesign' },
  },
  Contacts: {
    screen: ContactsScreen,
    icon: { name: 'contacts', type: 'AntDesign' },
  },
  SignIn: {
    screen: SignInScreen,
    icon: { name: '', type: 'AntDesign' },
  },
  Forgot: {
    screen: ForgotPasswordScreen,
    icon: { name: '', type: 'AntDesign' },
  },
  Confirm: {
    screen: ChallengeScreen,
    icon: { name: '', type: 'AntDesign' },
  },
  MessageStack: {
    screen: null,
    icon: { name: 'mail-outline', type: 'MaterialIcons' },
  },
  MoreStack: {
    screen: null,
    icon: { name: 'more-horiz', type: 'MaterialIcons' },
  },
};
