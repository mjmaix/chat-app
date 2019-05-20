import React from 'react';
import { ListRenderItem } from 'react-native';
import { ListItem } from 'react-native-elements';
import { User } from '../../core/api/unsplash';
import NavigationService from '../../routes/NavigationService';

const UserListItem: ListRenderItem<User> = ({ item, ...props }) => {
  return (
    <ListItem
      leftAvatar={{ source: { uri: item.profile_image.large } }}
      subtitle={item.bio ? item.bio : undefined}
      onPress={() => NavigationService.navigate('Chat', item)}
      title={`${item.last_name}, ${item.first_name}`}
    />
  );
};

export default UserListItem;
