import { Button, Icon } from 'native-base';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { StyleGuide } from '../../core/themes';

const Header = ({ navigation }: NavigationInjectedProps) => {
  const onPress = () => navigation.goBack(null);
  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={onPress}
        iconLeft
        transparent
        hitSlop={{ ...StyleGuide.hitSlop, right: 50 }}
      >
        <Icon name="arrow-back" />
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export const FixedBackHeader = withNavigation(Header);
