import React from 'react';
import { ListRenderItem } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

import { NavigationService } from '../../utils';
import { PreviewAvatar } from '../Images/PreviewAvatar';

// TODO: replace any
const UserListItem: ListRenderItem<any> = ({ item, ...props }) => {
  const ImageComponent = class extends React.Component<{}> {
    public render() {
      return (
        <PreviewAvatar
          size="small"
          imgKey={item.avatar}
          level={'protected'}
          identityId={item.identityId}
        />
      );
    }
  };
  return (
    <ListItem
      leftElement={<Avatar size="small" ImageComponent={ImageComponent} />}
      subtitle={item.email ? item.email : undefined}
      onPress={() => NavigationService.navigate('Chat', item)}
      title={`${item.familyName}, ${item.givenName}`}
      bottomDivider
      {...props}
    />
  );
};

export { UserListItem };
