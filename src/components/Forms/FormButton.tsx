import { Button as NBButton, NativeBase, Text } from 'native-base';
import React from 'react';
import { styles } from './styles';

interface FormButtonProps extends NativeBase.Button {
  onPress: () => void;
  label: string;
}

export const FormButton = ({
  onPress,
  label,
  ...buttonProps
}: FormButtonProps) => {
  return (
    <NBButton style={styles.button} onPress={onPress} {...buttonProps}>
      <Text>{label}</Text>
    </NBButton>
  );
};
