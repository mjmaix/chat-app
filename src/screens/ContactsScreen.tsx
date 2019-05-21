import React from 'react';
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import { withTheme } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import SimpleFlatList from '../components/Lists/SimpleFlatList';
import UserListItem from '../components/Lists/UserListItem';
import { SearchBar } from '../components/SearchBars/SearchBar';
import { User, users } from '../core/api/unsplash';
import { ScreenThemeProps } from '../core/themes';

type Props = ScreenThemeProps & NavigationScreenProps;

const datas: User[] = [...users.results];

const ContactsScreen = ({ theme, navigation }: Props) => {
  const HeaderComponent = (
    <SearchBar onChangeText={() => Alert.alert('not yet implemented')} />
  );
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
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
