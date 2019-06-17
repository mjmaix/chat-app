import orderBy from 'lodash/orderBy';
import React, { useContext } from 'react';
import { Alert, FlatList } from 'react-native';

import {
  FixedActionButton,
  ListEmptyComponent,
  MessageListItem,
  SearchBar,
  containerStyles,
} from '../../components';
import {
  ClConversationsContext,
  ClConversationsStoreInfo,
  ClUserContext,
  ConvoMessageItem,
  parseMessageData,
} from '../../core';
import { StyledScreenContainer } from '../../styled';
import { StyledBottomContainer } from '../../styled/StyledViews';

function getEmptyMessage(convoStore: ClConversationsStoreInfo): string {
  const { data: convoData, isReady: convoIsReady } = convoStore;
  return !convoIsReady
    ? 'Loading conversations'
    : convoData
    ? 'No existing conversations. Start a new one. TODO: open new message'
    : '';
}

const SearchComponent = (
  <SearchBar onChangeText={() => Alert.alert('not yet implemented')} />
);

const MessagesScreen = () => {
  const convoStore = useContext(ClConversationsContext);
  const userStore = useContext(ClUserContext);

  const parsedConvos: ConvoMessageItem[] = parseMessageData(
    convoStore,
    userStore,
  );

  return (
    <StyledScreenContainer>
      <FlatList<ConvoMessageItem>
        ListEmptyComponent={
          <ListEmptyComponent message={getEmptyMessage(convoStore)} />
        }
        refreshing={!convoStore.isReady}
        ListHeaderComponent={SearchComponent}
        style={containerStyles.fullWidth}
        data={convoStore.isReady ? orderBy(parsedConvos, [], []) : null}
        renderItem={item => <MessageListItem item={item.item} />}
        keyExtractor={item => item.id}
      />
      <StyledBottomContainer rightContent>
        {<FixedActionButton />}
      </StyledBottomContainer>
    </StyledScreenContainer>
  );
};

export { MessagesScreen };
