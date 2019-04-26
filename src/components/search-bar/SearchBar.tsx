import { Icon, Input, Item, View } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import TransparentButton from '../buttons/TransparentButton';
import { IconObject } from '../icons';

interface SearchProps {
  leftIcon?: IconObject;
  rightIcon?: IconObject;
  buttonText: string;
  inputPlaceholder: string;
  submitButtonPress?: (text: string) => void;
  onChangeText?: (text: string) => void;
  headerLeft?: () => React.ReactNode;
}

export const SearchBar = ({
  leftIcon,
  rightIcon,
  buttonText,
  inputPlaceholder,
  submitButtonPress: submitButtonPress,
  onChangeText,
  headerLeft: headerLeft,
}: SearchProps) => {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      {!!headerLeft && headerLeft()}
      <Item rounded={true} style={styles.inputItem}>
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
      {!!submitButtonPress && (
        <TransparentButton
          label={buttonText}
          onPress={() => submitButtonPress(text)}
        />
      )}
    </View>
  );
};

SearchBar.defaultProps = {
  leftIcon: { name: 'ios-search', type: 'Ionicons' },
  rightIcon: null,
  buttonText: 'Search',
  inputPlaceholder: 'Search',
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 5, // FIXME: use StyleGuide
  },
  inputItem: {
    backgroundColor: 'white',
  },
});
