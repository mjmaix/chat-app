import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ThemeProps, withTheme } from '../core/themes';

const ChatSCreen = ({ theme }: ThemeProps) => {
  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <SafeAreaView style={styles.container}>
        <Text style={[styles.text, { color: theme.color }]}>CHAT</Text>
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

export default withTheme(ChatSCreen);
