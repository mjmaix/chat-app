import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import SimpleFlatList from '../components/lists/SimpleFlatList';
import UserListItem from '../components/lists/UserListItem';
import { SearchBar } from '../components/search-bar/SearchBar';
import { User, users } from '../core/api/unsplash';
import { ThemeProps, withTheme } from '../core/themes';
import { Mappings } from '../routes/mappings';

type Props = ThemeProps & NavigationScreenProps;

const datas: User[] = [...users.results];

const ContactsScreen = ({ theme, navigation }: Props) => {
  const HeaderComponent = (
    <SearchBar
      rightIcon={{
        ...Mappings.Chat.icon,
        onPress: () => navigation.navigate('Chat'),
      }}
    />
  );
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
