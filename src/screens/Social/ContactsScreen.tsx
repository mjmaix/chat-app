import _ from 'lodash';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

import { SearchBar, SimpleFlatList, UserListItem } from '../../components';
import { handleListClUsers } from '../../core/actions/queryActions';
import {
  subscribeToCreateClUser,
  subscribeToDeleteClUser,
  subscribeToUpdateClUser,
} from '../../core/actions/subscriptionActions';
import { StyledScreenContainer } from '../../styled';

type Props = NavigationScreenProps;
interface State {
  users: any[];
}

// TODO: replace any types
// TODO: refactor
class ContactsScreen extends Component<Props, State> {
  public readonly state: State = {
    users: [],
  };
  public createObserver: any;
  public updateObserver: any;
  public deleteObserver: any;

  public componentDidMount() {
    handleListClUsers().then((list: any) => {
      this.setState({ users: list.items });
    });

    this.createObserver = subscribeToCreateClUser((data: any) => {
      const clUser = data.onCreateClUser;
      this.setState(prev => ({ users: [clUser, ...prev.users] }));
    });
    this.updateObserver = subscribeToUpdateClUser((data: any) => {
      this.setState(prev => {
        const clUser = data.onUpdateClUser;
        const idx = _.findIndex(
          prev.users,
          (d: any) => d.username === clUser.username,
        );
        const newUsers = [...prev.users];
        newUsers.splice(idx, 1, clUser);
        return { users: newUsers };
      });
    });
    this.deleteObserver = subscribeToDeleteClUser((data: any) => {
      const clUser = data.onDeleteClUser;
      this.setState(prev => {
        const newUsers = _.remove(
          prev.users,
          (d: any) => d.username === clUser.username,
        );
        return { users: newUsers };
      });
    });
  }

  public componentWillUnmount() {
    this.createObserver.unsubscribe();
    this.updateObserver.unsubscribe();
    this.deleteObserver.unsubscribe();
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
