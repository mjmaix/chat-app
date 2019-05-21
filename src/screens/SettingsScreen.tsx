import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { UpdateTheme, withTheme } from 'react-native-elements';
import { ThemeListItem, ThemeWithId } from '../components/Lists/ThemeListItem';
import {
  getTheme,
  ScreenThemeProps,
  STORAGE_KEY,
  themes,
} from '../core/themes';

const saveThemeId = (item: ThemeWithId, updateTheme: UpdateTheme) => {
  const t = getTheme(item.id);
  if (t) {
    updateTheme(t);
  }
  void AsyncStorage.setItem(STORAGE_KEY, item.id);
};

const SettingsScreen = ({ updateTheme, theme }: ScreenThemeProps) => {
  const { colors } = theme;
  const ListHeaderComp = (
    <Text style={styles.headline}>{`Choose your theme:`}</Text>
  );

  const renderItem = (data: ListRenderItemInfo<ThemeWithId>) => (
    <ThemeListItem
      item={data.item}
      onPress={e => saveThemeId(e, updateTheme)}
    />
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList<ThemeWithId>
          style={styles.flatListContainer}
          ListHeaderComponent={ListHeaderComp}
          data={themes}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </View>
  );
};

SettingsScreen.navigationOptions = {
  drawerLabel: 'Settings',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    flex: 1,
  },
  headline: {
    marginTop: 60,
    marginBottom: 20,
    marginLeft: 20,
    fontWeight: '200',
    fontSize: 24,
  },
});

export default withTheme(SettingsScreen);
