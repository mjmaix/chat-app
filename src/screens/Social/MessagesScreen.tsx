import gql from 'graphql-tag';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { Alert, FlatList, ListRenderItemInfo, Text } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { ThemedComponentProps, withTheme } from 'styled-components';

import { SearchBar, containerStyles } from '../../components';
import { listClRooms } from '../../graphql/queries';
import { StyledScreenContainer } from '../../styled';
import { StyledBottomContainer } from '../../styled/StyledViews';

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
const ActionComponent = withTheme(
  class extends React.Component<ThemedComponentProps> {
    public render() {
      const { theme } = this.props;
      return (
        <Icon
          name="new-message"
          type="entypo"
          raised
          reverse
          onPress={() => null}
          color={theme.colors.primary}
          underlayColor={theme.colors.primarylight}
        />
      );
    }
  },
);

const MessagesScreen = () => {
  return (
    <Query query={LIST_ROOMS} fetchPolicy="cache-and-network">
      {({ data, loading, error }: QueryResult) => {
        if (error) {
          return <Text>{error.message}</Text>;
        }

        return (
          <StyledScreenContainer>
            <FlatList<ClRoom>
              refreshing={loading}
              ListHeaderComponent={SearchComponent}
              style={containerStyles.fullWidth}
              data={loading ? null : data.listClRooms.items}
              renderItem={MessageListItem}
            />
            <StyledBottomContainer rightContent>
              {<ActionComponent />}
            </StyledBottomContainer>
          </StyledScreenContainer>
        );
      }}
    </Query>
  );
};

export { MessagesScreen };
