import { Button as NBButton, NativeBase, Text } from 'native-base';
import React from 'react';
import { styles } from '../styles';

interface Button extends NativeBase.Button {
  onPress: () => void;
  label: string;
}

export const Button = ({ onPress, label, ...buttonProps }: Button) => {
  return (
    <NBButton style={styles.button} onPress={onPress} {...buttonProps}>
      <Text>{label}</Text>
    </NBButton>
  );
};
