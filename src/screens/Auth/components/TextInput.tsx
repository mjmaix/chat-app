import { Input, Item, NativeBase } from 'native-base';
import React from 'react';
import { styles } from '../styles';

export const TextInput = (props: NativeBase.Input) => {
  return (
    <Item fixedLabel rounded>
      <Input style={styles.input} {...props} />
    </Item>
  );
};
