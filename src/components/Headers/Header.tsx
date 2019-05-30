import React from 'react';
import { TextProps, View } from 'react-native';
import { HeaderSub } from './HeaderSub';
import { HeaderText } from './HeaderText';
import { styles } from './styles';

interface HeaderProps extends TextProps {
  title: string;
  message?: string;
}

export const Header = ({ title: text, message, ...props }: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <HeaderText text={text} {...props} />
      {!!message && <HeaderSub message={message} {...props} />}
    </View>
  );
};
