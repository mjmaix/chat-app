import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import SimpleFlatList from '../components/Lists/SimpleFlatList';
import UserListItem from '../components/Lists/UserListItem';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { User, users } from '../core/api/unsplash';
import { ThemeProps, withTheme } from '../core/themes';

type Props = ThemeProps & NavigationScreenProps;

const datas: User[] = [...users.results];

const ContactsScreen = ({ theme, navigation }: Props) => {
  const HeaderComponent = <SearchBar />;
  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <SafeAreaView style={styles.container}>
        <SimpleFlatList<User>
          ListHeaderComponent={HeaderComponent}
          stickyHeaderIndices={[0]}
          data={datas}
          renderItem={data => <UserListItem {...data} />}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontWeight: 'bold',
  },
});

export default withTheme(ContactsScreen);
