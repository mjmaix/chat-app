import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Icon, IconProps } from 'react-native-elements';

import { StyleGuide } from '../../core';
import { DevBorders, NavigationService } from '../../utils';

interface FixedBackHeaderProps {
  iconProps?: IconProps;
}

export const FixedBackHeader = ({ iconProps }: FixedBackHeaderProps) => {
  const onPress = () => NavigationService.goBack();
  return (
    <SafeAreaView style={styles.container}>
      <Button
        containerStyle={styles.buttonContainer}
        onPress={onPress}
        icon={<Icon name="chevron-left" type={'entypo'} {...iconProps} />}
        type="clear"
        hitSlop={{ ...StyleGuide.hitSlop, right: 50 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  buttonContainer: {
    marginTop: StyleGuide.gap.big,
  },
});
