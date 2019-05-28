import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { ThemeProps, withTheme as rneWithTheme } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { ThemeListItem } from '../components';
import { STORAGE_KEY, Theme, ThemeHelper, themes } from '../core';
import { StyledBoldText, StyledScreenContainer } from '../styled';

const saveThemeId = (item: Theme) => {
  ThemeHelper.set(item.id);
  void AsyncStorage.setItem(STORAGE_KEY, item.id);
};

const SettingsScreen = (props: ThemeProps<Theme> & NavigationScreenProps) => {
  const ListHeaderComp = (
    <StyledBoldText
      style={styles.headline}
    >{`Choose your theme:`}</StyledBoldText>
  );

  const renderItem = (data: ListRenderItemInfo<Theme>) => {
    return (
      <ThemeListItem
        item={data.item}
        onPress={e => {
          props.updateTheme(data.item);
          saveThemeId(data.item);
        }}
      />
    );
  };

  return (
    <StyledScreenContainer>
      <FlatList<Theme>
        keyExtractor={d => `${d.id}`}
        style={styles.flatListContainer}
        ListHeaderComponent={ListHeaderComp}
        data={themes}
        renderItem={renderItem}
      />
    </StyledScreenContainer>
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

const ThemedSettingsScreen = rneWithTheme(SettingsScreen);
export { ThemedSettingsScreen as SettingsScreen };
