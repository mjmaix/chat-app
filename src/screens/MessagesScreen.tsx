import React from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { withTheme } from 'react-native-elements';
import { SearchBar } from '../components/SearchBars/SearchBar';
import { ScreenThemeProps } from '../core/themes';

const MessagesScreen = ({ theme }: ScreenThemeProps) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      <SafeAreaView style={styles.container}>
        <Text style={[styles.text, { color: theme.colors.primary }]}>
          MESSAGES
        </Text>
      </SafeAreaView>
    </View>
  );
};

MessagesScreen.navigationOptions = () => ({
  header: () => (
    <SearchBar onChangeText={() => Alert.alert('not yet implemented')} />
  ),
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
