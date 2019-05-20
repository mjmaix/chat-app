import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { ThemeProps, withTheme } from '../core/themes';
import NavigationService from '../routes/NavigationService';

type Props = ThemeProps & NavigationScreenProps;

const ProfileScreen = ({ theme, navigation }: Props) => {
  const handleSignOutAsync = async () => {
    await AsyncStorage.clear();
    NavigationService.navigate('Auth');
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <SafeAreaView style={styles.container}>
        <Text style={[styles.text, { color: theme.color }]}>PROFILE</Text>
        <Button title={'Sign out'} onPress={handleSignOutAsync} type="clear" />
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

export default withTheme(ProfileScreen);
