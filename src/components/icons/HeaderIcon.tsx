import React from 'react';
import { Icon, withTheme } from 'react-native-elements';
import { IconObject } from '.';
import { ExtendedFullTheme, StyleGuide } from '../../core/themes';

interface HeaderIconProps {
  icon: IconObject;
  onPress?: () => void;
  theme: ExtendedFullTheme;
}

export const HeaderIcon = withTheme(
  ({ icon, onPress, theme }: HeaderIconProps) => {
    return (
      <Icon
        {...icon}
        onPress={onPress}
        color={theme.colors.primary}
        containerStyle={{
          padding: StyleGuide.gap.regular,
        }}
      />
    );
  },
);
