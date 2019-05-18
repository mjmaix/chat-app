import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { ThemeProps, withTheme } from '../core/themes';

const MessagesScreen = ({ theme }: ThemeProps) => {
  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <SafeAreaView style={styles.container}>
        <Text style={[styles.text, { color: theme.color }]}>MESSAGES</Text>
      </SafeAreaView>
    </View>
  );
};

MessagesScreen.navigationOptions = () => ({
  header: () => <SearchBar />,
  title: 'MessageScreen',
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

export default withTheme(MessagesScreen);
