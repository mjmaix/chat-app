import { Button, Header, Icon, Input, Item, Text } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { DevBorders } from '../../utils/borders';
import { IconObject } from '../icons';

interface SearchProps {
  leftIcon?: IconObject;
  rightIcon?: IconObject;
  buttonText?: 'Search';
  inputPlaceholder?: 'Search';
  onButtonPress?: (text: string) => void;
  onChangeText?: (text: string) => void;
}

export const SearchBar = ({
  leftIcon,
  rightIcon,
  buttonText,
  inputPlaceholder,
  onButtonPress,
  onChangeText
}: SearchProps) => {
  const [text, setText] = useState('');
  return (
    <Header style={styles.container} searchBar={true} rounded={true}>
      <Item>
        {!!leftIcon && <Icon {...leftIcon} />}
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          value={text}
          placeholder={inputPlaceholder}
          onChangeText={t => {
            if (onChangeText) {
              onChangeText(t);
            }
            setText(t);
          }}
        />
        {!!rightIcon && <Icon {...rightIcon} />}
      </Item>
      {!!onButtonPress && (
        <Button transparent={true} onPress={() => onButtonPress(text)}>
          <Text>{buttonText}</Text>
        </Button>
      )}
    </Header>
  );
};

SearchBar.defaultProps = {
  leftIcon: { name: 'ios-search', type: 'Ionicons' },
  rightIcon: null,
  buttonText: 'Search',
  inputPlaceholder: 'Search'
};

const styles = StyleSheet.create({
  container: {
    ...DevBorders.red
  }
});
