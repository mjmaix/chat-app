import React from 'react';
import { Alert } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import SimpleFlatList from '../components/Lists/SimpleFlatList';
import UserListItem from '../components/Lists/UserListItem';
import { SearchBar } from '../components/SearchBars/SearchBar';
import { User, users } from '../core/api/unsplash';
import { ScreenContainer } from '../styled';

type Props = NavigationScreenProps;

const datas: User[] = [...users.results];

const ContactsScreen = ({ navigation }: Props) => {
  const HeaderComponent = (
    <SearchBar onChangeText={() => Alert.alert('not yet implemented')} />
  );
  return (
    <ScreenContainer>
      <SimpleFlatList<User>
        ListHeaderComponent={HeaderComponent}
        stickyHeaderIndices={[0]}
        data={datas}
        renderItem={data => <UserListItem {...data} />}
      />
    </ScreenContainer>
  );
};

export default ContactsScreen;
