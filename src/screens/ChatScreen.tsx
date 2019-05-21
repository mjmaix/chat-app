import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { withTheme } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { ScreenThemeProps } from '../core/themes';

type Props = ScreenThemeProps & NavigationScreenProps;

const ChatScreen = ({ theme, navigation }: Props) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      <SafeAreaView style={styles.container}>
        <Text style={[styles.text, { color: theme.colors.primary }]}>CHAT</Text>
      </SafeAreaView>
    </View>
  );
};

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

export default withTheme(ChatScreen);
