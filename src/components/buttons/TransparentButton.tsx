import { Button, Text } from 'native-base';
import React from 'react';

interface Props {
  label: string;
  onPress: () => void;
}

const TransparentButton: React.FC<Props> = ({ label, onPress }: Props) => {
  return (
    <Button transparent onPress={() => onPress()}>
      <Text>{label}</Text>
    </Button>
  );
};

export default TransparentButton;
