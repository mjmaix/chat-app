import React from 'react';
import { Platform } from 'react-native';
import { Input, InputProps } from 'react-native-elements';

export const PasswordInput = (props: InputProps) => {
  return (
    <Input
      placeholder="Password"
      keyboardType={Platform.OS === 'android' ? 'visible-password' : undefined}
      secureTextEntry
      textContentType="password"
      {...props}
    />
  );
};
