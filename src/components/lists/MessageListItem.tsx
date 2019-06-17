import React from 'react';
import { ListItem } from 'react-native-elements';

import { ListItemS3ImageAvatar } from '../../components/Lists/ListItemS3ImageAvatar';
import { ConvoMessageItem } from '../../core';
import { NavigationService } from '../../utils';

const MessageListItem = ({ item }: { item: ConvoMessageItem }) => {
  const message = item.lastMessage;
  if (!message) {
    return null;
  }
  const author = message.author as ClUserWithConvos;

  return (
    <ListItem
      leftAvatar={<ListItemS3ImageAvatar user={author} />}
      key={item.id}
      title={`${author.givenName}, ${author.familyName}`}
      subtitle={message.content}
      onPress={() =>
        NavigationService.navigate('Chat', {
          selectedUser: message.author,
        })
      }
      bottomDivider
      chevron
    />
  );
};

export { MessageListItem };
