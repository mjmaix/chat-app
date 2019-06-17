import React from 'react';
import { ListRenderItem } from 'react-native';
import { ListItem } from 'react-native-elements';

import { NavigationService } from '../../utils';
import { ListItemS3ImageAvatar } from './ListItemS3ImageAvatar';

const UserListItem: ListRenderItem<any> = ({ item, ...props }) => {
  return (
    <ListItem
      leftElement={<ListItemS3ImageAvatar user={item} />}
      subtitle={item.email ? item.email : undefined}
      onPress={() => NavigationService.navigate('Chat', { selectedUser: item })}
      title={`${item.familyName}, ${item.givenName}`}
      bottomDivider
      {...props}
    />
  );
};

export { UserListItem };
