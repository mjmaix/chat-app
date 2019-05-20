import React from 'react';
import { Button, ButtonProps } from 'react-native-elements';
import { styles } from './styles';

interface FormButtonProps extends ButtonProps {
  onPress: () => void;
  label: string;
}

export const FormButton = ({
  onPress,
  label,
  ...buttonProps
}: FormButtonProps) => {
  return (
    <Button
      title={label}
      style={styles.button}
      onPress={onPress}
      {...buttonProps}
    />
  );
};
