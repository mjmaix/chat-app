import { Badge, Button, Icon, Text } from 'native-base';
import React from 'react';

export interface ButtonIconProps {
  iconName: string;
  labelText?: string;
  badgeText?: string;
  vertical?: boolean;
  active?: boolean;
  onPress?: () => void;
}

export const ButtonIcon = ({
  labelText,
  iconName,
  badgeText,
  vertical,
  active,
  onPress
}: ButtonIconProps) => {
  const badge = !!badgeText;
  return (
    <Button active={active} badge={badge} vertical={vertical} onPress={onPress}>
      {badge && (
        <Badge>
          <Text>{badgeText}</Text>
        </Badge>
      )}
      <Icon name={iconName} />
      {!!labelText && <Text>{labelText}</Text>}
    </Button>
  );
};

ButtonIcon.defaultProps = {
  active: false,
  vertical: true,
  badgeText: null,
  labelText: null
};
