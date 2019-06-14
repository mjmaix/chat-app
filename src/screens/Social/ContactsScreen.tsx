import orderBy from 'lodash/orderBy';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { SearchBar, SimpleFlatList, UserListItem } from '../../components';
import { ClContactsConsumer } from '../../core';
import {
  StyledBoldText,
  StyledCenterContainer,
  StyledScreenContainer,
} from '../../styled';

type Props = Nullable<NavigationScreenProps>;

class ContactsScreen extends Component<Props> {
  public render() {
    const HeaderComponent = (
      <SearchBar
        placeholder={'Search by name'}
        onChangeText={() => Alert.alert('not yet implemented')}
      />
    );
    return (
      <ClContactsConsumer>
        {({ data, isReady }) => {
          return (
            <StyledScreenContainer>
              <SimpleFlatList<any>
                ListEmptyComponent={
                  isReady ? null : (
                    <StyledCenterContainer>
                      <StyledBoldText>No one is online</StyledBoldText>
                    </StyledCenterContainer>
                  )
                }
                ListHeaderComponent={HeaderComponent}
                stickyHeaderIndices={[0]}
                refreshing={isReady}
                data={orderBy(
                  Object.values(data),
                  ['familyName', 'givenName'],
                  ['asc', 'asc'],
                )}
                keyExtractor={item => item.id}
                renderItem={item => <UserListItem {...item} />}
              />
            </StyledScreenContainer>
          );
        }}
      </ClContactsConsumer>
    );
  }
}

export { ContactsScreen };
