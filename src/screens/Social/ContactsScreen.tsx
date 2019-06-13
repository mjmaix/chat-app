import diffBy from 'lodash/differenceBy';
import findIndex from 'lodash/findIndex';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { ZenObservable } from '../../../node_modules/zen-observable-ts/lib/types';
import { ListClUsersQuery } from '../../API';
import { SearchBar, SimpleFlatList, UserListItem } from '../../components';
import { handleGetCurrentUser } from '../../core';
import { handleListContacts } from '../../core/actions/queryActions';
import {
  subscribeToCreateClUser,
  subscribeToDeleteClUser,
  subscribeToUpdateClUser,
} from '../../core/actions/subscriptionActions';
import {
  StyledBoldText,
  StyledCenterContainer,
  StyledScreenContainer,
} from '../../styled';

type Props = Nullable<NavigationScreenProps>;

type ClUser = ModelFromListQuery<ListClUsersQuery, 'listClUsers'>;

interface State {
  listQuery?: ListClUsersQuery;
  users: ClUser[];
  loading: boolean;
}

class ContactsScreen extends Component<Props, State> {
  public readonly state: State = {
    users: [],
    loading: true,
  };

  public createObserver?: ZenObservable.Subscription;
  public updateObserver?: ZenObservable.Subscription;
  public deleteObserver?: ZenObservable.Subscription;

  public componentDidMount() {
    handleGetCurrentUser()
      .then(user => handleListContacts(user))
      .then((data?: ListClUsersQuery) => {
        const newState: Partial<State> = { listQuery: data, loading: false };
        if (data && data.listClUsers && data.listClUsers.items) {
          newState.users = data.listClUsers.items as ClUser[];
        }
        return newState;
      })

      .then(newState => {
        this.setState(newState as State);
      });

    this.createObserver = subscribeToCreateClUser(({ data }) => {
      const clUser = data.onCreateClUser;
      if (clUser) {
        this.setState(prev => ({ users: [clUser, ...prev.users] }));
      }
    });
    this.updateObserver = subscribeToUpdateClUser(({ data }) => {
      const clUser = data.onUpdateClUser;
      if (clUser) {
        this.setState(prev => {
          const idx = findIndex(prev.users, (d: any) => d.id === clUser.id);
          const newUsers = [...prev.users];
          newUsers.splice(idx, 1, clUser);
          return { users: newUsers };
        });
      }
    });
    this.deleteObserver = subscribeToDeleteClUser(({ data }) => {
      const clUser = data.onDeleteClUser;
      if (clUser) {
        this.setState(prev => {
          const newUsers = diffBy(prev.users, [clUser], 'id');
          return { users: newUsers };
        });
      }
    });
  }

  public componentWillUnmount() {
    if (this.createObserver) {
      this.createObserver.unsubscribe();
    }
    if (this.updateObserver) {
      this.updateObserver.unsubscribe();
    }
    if (this.deleteObserver) {
      this.deleteObserver.unsubscribe();
    }
  }

  public render() {
    const { users, loading } = this.state;
    const HeaderComponent = (
      <SearchBar
        placeholder={'Search by name'}
        onChangeText={() => Alert.alert('not yet implemented')}
      />
    );
    return (
      <StyledScreenContainer>
        <SimpleFlatList<any>
          ListEmptyComponent={
            loading ? null : (
              <StyledCenterContainer>
                <StyledBoldText>No one is online</StyledBoldText>
              </StyledCenterContainer>
            )
          }
          ListHeaderComponent={HeaderComponent}
          stickyHeaderIndices={[0]}
          refreshing={loading}
          data={users}
          keyExtractor={item => item.id}
          renderItem={data => <UserListItem {...data} />}
        />
      </StyledScreenContainer>
    );
  }
}

export { ContactsScreen };
