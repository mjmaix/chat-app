import { Badge, Button, Icon, Text } from 'native-base';
import React from 'react';
import { IconObject } from '.';

export interface ButtonIconProps {
  icon: IconObject;
  labelText?: string;
  badgeText?: string;
  vertical?: boolean;
  active?: boolean;
  transparent?: boolean;
  onPress?: () => void;
}

export const ButtonIcon = ({
  labelText,
  icon,
  badgeText,
  vertical,
  active,
  onPress,
  transparent,
}: ButtonIconProps) => {
  const badge = !!badgeText;
  return (
    <Button
      transparent={transparent}
      active={active}
      badge={badge}
      vertical={vertical}
      onPress={onPress}
      // dark
    >
      {badge && (
        <Badge>
          <Text>{badgeText}</Text>
        </Badge>
      )}
      <Icon {...icon} />
      {!!labelText && <Text>{labelText}</Text>}
    </Button>
  );
};

ButtonIcon.defaultProps = {
  active: false,
  vertical: true,
  badgeText: null,
  labelText: null,
  transparent: true,
};
