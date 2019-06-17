import React from 'react';
import { ListItem } from 'react-native-elements';

import { ListItemS3ImageAvatar } from '../../components';
import { ConvoMessageItem } from '../../core';

const MessageListItem = ({ item }: { item: ConvoMessageItem }) => {
  const message = item.lastMessage;
  const author = message.author as ClUserWithConvos;
  return (
    <ListItem
      leftAvatar={<ListItemS3ImageAvatar user={author} />}
      key={item.id}
      title={`${author.givenName}, ${author.familyName}`}
      subtitle={item.lastMessage.content}
      bottomDivider
      chevron
    />
  );
};

export { MessageListItem };
