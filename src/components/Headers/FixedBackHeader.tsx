import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Icon, IconProps } from 'react-native-elements';
import { StyleGuide } from '../../core/themes';
import NavigationService from '../../routes/NavigationService';

interface FixedBackHeaderProps {
  iconProps?: IconProps;
}

export const FixedBackHeader = ({ iconProps }: FixedBackHeaderProps) => {
  const onPress = () => NavigationService.goBack();
  return (
    <SafeAreaView style={styles.container}>
      <Button
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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
});
