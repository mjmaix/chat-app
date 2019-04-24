import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ThemeProps, withTheme } from '../core/themes';

const HomeScreen = ({ theme }: ThemeProps) => {
  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <SafeAreaView style={styles.container}>
        <Text style={[styles.text, { color: theme.color }]}>HOME</Text>
      </SafeAreaView>
    </View>
  );
};

HomeScreen.navigationOptions = {
  drawerLabel: 'Home',
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

export default withTheme(HomeScreen);
