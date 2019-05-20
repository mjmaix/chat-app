import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { StyleGuide } from '../../core/themes';
import NavigationService from '../../routes/NavigationService';

const Header = () => {
  const onPress = () => NavigationService.goBack();
  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={onPress}
        icon={<Icon name="chevron-left" type={'entypo'} />}
        type="clear"
        hitSlop={{ ...StyleGuide.hitSlop, right: 50 }}
      />
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

export const FixedBackHeader = Header;
