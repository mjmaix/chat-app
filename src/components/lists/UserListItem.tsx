import React from 'react';
import { ListRenderItem } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

import { NavigationService } from '../../utils';
import { PreviewAvatar } from '../Images/PreviewAvatar';

// TODO: replace any
const UserListItem: ListRenderItem<any> = ({ item, ...props }) => {
  const size = 'medium';
  const ImageComponent = class extends React.Component<{}> {
    public render() {
      return (
        <PreviewAvatar
          editable={false}
          rounded={false}
          size={size}
          imgKey={item.avatar}
          level={'protected'}
          identityId={item.identityId}
        />
      );
    }
  };
  return (
    <ListItem
      leftElement={<Avatar size={size} ImageComponent={ImageComponent} />}
      subtitle={item.email ? item.email : undefined}
      onPress={() => NavigationService.navigate('Chat', { selectedUser: item })}
      title={`${item.familyName}, ${item.givenName}`}
      bottomDivider
      {...props}
    />
  );
};

export { UserListItem };
