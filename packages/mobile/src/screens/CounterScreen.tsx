import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ThemeProps, withTheme } from '../core/ThemeProviderHoc';

const CounterScreen = ({ theme }: ThemeProps) => {
  const [count, setCount] = useState(0);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text style={[styles.text, { color: theme.color }]}>{count}</Text>
      <Button title={'Increment'} onPress={() => setCount(count + 1)} />
    </View>
  );
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

export default withTheme(CounterScreen);
