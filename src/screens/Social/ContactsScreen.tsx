import _ from 'lodash';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { ZenObservable } from '../../../node_modules/zen-observable-ts/lib/types';
import { ListClUsersQuery } from '../../API';
import { SearchBar, SimpleFlatList, UserListItem } from '../../components';
import { handleListContacts } from '../../core/actions/queryActions';
import {
  subscribeToCreateClUser,
  subscribeToDeleteClUser,
  subscribeToUpdateClUser,
} from '../../core/actions/subscriptionActions';
import { StyledScreenContainer } from '../../styled';

type Props = Nullable<NavigationScreenProps>;

type ClUser = ModelFromListQuery<ListClUsersQuery, 'listClUsers'>;

interface State {
  listQuery?: ListClUsersQuery;
  users: ClUser[];
}

class ContactsScreen extends Component<Props, State> {
  public readonly state: State = {
    users: [],
  };

  public createObserver?: ZenObservable.Subscription;
  public updateObserver?: ZenObservable.Subscription;
  public deleteObserver?: ZenObservable.Subscription;

  public componentDidMount() {
    handleListContacts().then((data?: ListClUsersQuery) => {
      const newState: Partial<State> = { listQuery: data };
      if (data && data.listClUsers && data.listClUsers.items) {
        newState.users = data.listClUsers.items as ClUser[];
      }
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
          const idx = _.findIndex(
            prev.users,
            (d: any) => d.username === clUser.username,
          );
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
          const newUsers = _.remove(
            prev.users,
            (d: any) => d.username === clUser.username,
          );
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
    const { users } = this.state;
    if (!this.state.users) {
      return null;
    }
    const HeaderComponent = (
      <SearchBar onChangeText={() => Alert.alert('not yet implemented')} />
    );
    return (
      <StyledScreenContainer>
        <SimpleFlatList<any>
          ListHeaderComponent={HeaderComponent}
          stickyHeaderIndices={[0]}
          data={users}
          keyExtractor={item => item.username}
          renderItem={data => <UserListItem {...data} />}
        />
      </StyledScreenContainer>
    );
  }
}

export { ContactsScreen };
