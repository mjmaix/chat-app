import { H2, View } from 'native-base';
import React from 'react';
import { TextProps } from 'react-native';
import { styles } from './styles';

export interface HeaderTextProps extends TextProps {
  text: string;
}

export const HeaderText = ({ text, ...textProps }: HeaderTextProps) => {
  return (
    <View style={styles.headerText}>
      <H2 {...textProps}>{text}</H2>
    </View>
  );
};
