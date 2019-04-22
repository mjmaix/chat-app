import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Theme } from '../core/themeProvider';
import { ThemeProps, withTheme } from '../core/ThemeProviderHoc';

interface FlatListItem {
  item: Theme;
}

const SettingsScreen = ({ theme, themes, setTheme }: ThemeProps) => {
  const renderItem = ({ item }: FlatListItem) => (
    <TouchableOpacity onPress={() => setTheme(item.key)}>
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: item.backgroundColor
          }
        ]}
      >
        <Text style={[styles.itemText, { color: item.color }]}>{item.key}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList<Theme>
          style={styles.flatListContainer}
          ListHeaderComponent={
            <Text style={[styles.headline, { color: theme.backgroundColor }]}>
              Choose your theme:
            </Text>
          }
          data={themes}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </View>
  );
};

SettingsScreen.navigationOptions = {
  drawerLabel: 'Settings'
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  flatListContainer: {
    flex: 1
  },
  headline: {
    marginTop: 60,
    marginBottom: 20,
    marginLeft: 20,
    fontWeight: '200',
    fontSize: 24
  },
  itemContainer: {
    height: 100,
    justifyContent: 'center',
    paddingLeft: 20
  },
  itemText: { fontWeight: 'bold' }
});

export default withTheme(SettingsScreen);
