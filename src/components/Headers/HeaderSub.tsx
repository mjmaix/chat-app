import { Text } from 'native-base';
import React from 'react';
import { TextProps } from 'react-native';

export interface HeaderSubProps extends TextProps {
  message: string;
}

export const HeaderSub = ({ message, ...props }: HeaderSubProps) => {
  return (
    <Text numberOfLines={3} {...props}>
      {message}
    </Text>
  );
};
