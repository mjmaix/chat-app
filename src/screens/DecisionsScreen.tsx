import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ThemeProps, withTheme } from '../core/ThemeProviderHoc';

const DecisionsScreen = ({ theme }: ThemeProps) => {
  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <SafeAreaView style={styles.container}>
        <Text style={[styles.text, { color: theme.color }]}>DECISIONS</Text>
      </SafeAreaView>
    </View>
  );
};

DecisionsScreen.navigationOptions = {
  drawerLabel: 'Decisions'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold'
  }
});

export default withTheme(DecisionsScreen);
