import React from 'react';
import { Button as RNEButton, ButtonProps, Icon } from 'react-native-elements';
import { styles } from './styles';

interface FormButtonProps extends ButtonProps {
  onPress: () => void;
  label: string;
}

export const Button = ({ onPress, label, ...buttonProps }: FormButtonProps) => {
  return (
    <RNEButton
      title={label}
      style={styles.button}
      onPress={onPress}
      {...buttonProps}
    />
  );
};
