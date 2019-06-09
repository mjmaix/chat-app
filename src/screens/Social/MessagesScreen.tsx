import gql from 'graphql-tag';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItemInfo,
  Text,
} from 'react-native';
import { ListItem } from 'react-native-elements';

import { SearchBar, containerStyles } from '../../components';
import { listClRooms } from '../../graphql/queries';
import { StyledScreenContainer } from '../../styled';

const LIST_ROOMS = gql(listClRooms);

const MessageListItem = (rItem: ListRenderItemInfo<ClRoom>) => {
  const room = rItem.item;
  return (
    <ListItem key={room.id} title={`room/${room.id}`} bottomDivider chevron />
  );
};
const SearchComponent = (
  <SearchBar onChangeText={() => Alert.alert('not yet implemented')} />
);
const MessagesScreen = () => {
  return (
    <Query query={LIST_ROOMS} fetchPolicy="cache-and-network">
      {({ data, loading, error }: QueryResult) => {
        if (error) {
          return <Text>{error.message}</Text>;
        }
        if (loading) {
          return <ActivityIndicator />;
        }

        return (
          <StyledScreenContainer>
            <FlatList<ClRoom>
              ListHeaderComponent={SearchComponent}
              style={containerStyles.fullWidth}
              data={data.listClRooms.items}
              renderItem={MessageListItem}
            />
          </StyledScreenContainer>
        );
      }}
    </Query>
  );
};

export { MessagesScreen };
