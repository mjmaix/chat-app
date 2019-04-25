import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from '../components/search-bar/SearchBar';
import { ThemeProps, withTheme } from '../core/themes';

const ContactsScreen = ({ theme }: ThemeProps) => {
  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <SafeAreaView style={styles.container}>
        <Text style={[styles.text, { color: theme.color }]}>CONTACTS</Text>
      </SafeAreaView>
    </View>
  );
};

ContactsScreen.navigationOptions = () => ({
  header: () => <SearchBar />,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default withTheme(ContactsScreen);
