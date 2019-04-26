import { Icon, Text } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconObject } from '.';

// FIXME: correct copy paste
interface Props {
  icon: IconObject;
  badgeCount?: number;
  color?: string;
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default class IconWithBadge extends React.Component<Props> {
  public render() {
    const { icon, badgeCount, color } = this.props;
    return (
      <View style={styles.iconContainer}>
        <Icon {...icon} style={{ color }} />
        {!!badgeCount && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeCount}</Text>
          </View>
        )}
      </View>
    );
  }
}
