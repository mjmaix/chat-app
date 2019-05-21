import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button, withTheme } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { ScreenThemeProps } from '../core/themes';
import NavigationService from '../routes/NavigationService';

type Props = ScreenThemeProps & NavigationScreenProps;

const ProfileScreen = ({ theme, navigation }: Props) => {
  const handleSignOutAsync = async () => {
    await AsyncStorage.removeItem('userToken');
    NavigationService.navigate('Auth');
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgroundColor },
      ]}
    >
      <SafeAreaView style={styles.container}>
        <Text style={[styles.text, { color: theme.colors.primary }]}>
          PROFILE
        </Text>
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
