import React, { lazy, Suspense } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';

const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const SettingsScreen = lazy(() => import('./screens/SettingsScreen'));
const AboutScreen = lazy(() => import('./screens/AboutScreen'));

function Routes() {
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <NativeRouter>
        <View style={styles.container}>
          {/* <View style={styles.nav}>
            <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
              <Text>Home</Text>
            </Link>
            <Link to="/about" underlayColor="#f0f4f7" style={styles.navItem}>
              <Text>About</Text>
            </Link>
            <Link to="/settings" underlayColor="#f0f4f7" style={styles.navItem}>
              <Text>Settings</Text>
            </Link>
          </View> */}

          <Route exact={true} path="/" component={HomeScreen} />
          <Route path="/about" component={AboutScreen} />
          <Route path="/settings" component={SettingsScreen} />
        </View>
      </NativeRouter>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    padding: 10
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: 'center',
    fontSize: 15
  }
});

export default Routes;
