import { View } from 'native-base';
import React from 'react';
import { TextProps } from 'react-native';
import { styles } from '../styles';
import { HeaderSub } from './HeaderSub';
import { HeaderText } from './HeaderText';

interface HeaderProps extends TextProps {
  text: string;
  message?: string;
}

export const Header = ({ text, message, ...props }: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <HeaderText text={text} {...props} />
      {!!message && <HeaderSub message={message} {...props} />}
    </View>
  );
};
