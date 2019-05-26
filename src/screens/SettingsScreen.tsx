import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { ThemeListItem } from '../components';
import { STORAGE_KEY, Theme, themes } from '../core';
import { BoldText, ScreenContainer } from '../styled';

type Theme = typeof themes[0];

const saveThemeId = (item: Theme) => {
  Theme.set(item.id);
  void AsyncStorage.setItem(STORAGE_KEY, item.id);
};

const SettingsScreen = () => {
  const ListHeaderComp = (
    <BoldText style={styles.headline}>{`Choose your theme:`}</BoldText>
  );

  const renderItem = (data: ListRenderItemInfo<Theme>) => {
    console.log('data', data);
    return (
      <ThemeListItem item={data.item} onPress={e => saveThemeId(data.item)} />
    );
  };

  return (
    <ScreenContainer>
      <FlatList<Theme>
        keyExtractor={d => `${d.id}`}
        style={styles.flatListContainer}
        ListHeaderComponent={ListHeaderComp}
        data={themes}
        renderItem={renderItem}
      />
    </ScreenContainer>
  );
};

SettingsScreen.navigationOptions = {
  drawerLabel: 'Settings',
};

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    width: '100%',
  },
  headline: {
    marginTop: 60,
    marginBottom: 20,
    marginLeft: 20,
    fontWeight: '200',
    fontSize: 24,
  },
});

export { SettingsScreen };
