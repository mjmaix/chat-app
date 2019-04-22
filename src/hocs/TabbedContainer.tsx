import { Container, Content, Footer, FooterTab, Header } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Route, withRouter } from 'react-router';
import { ButtonIcon, ButtonIconProps } from '../components/icons/ButtonIcon';
import AboutScreen from '../screens/AboutScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

type TabbedContainerIconProps = ButtonIconProps & { route: string };

interface TabbedContainerProps {
  tabs: TabbedContainerIconProps[];
}

export const TabbedContainer = (props: TabbedContainerProps) => {
  return (
    <Container>
      <Header />
      <Content contentContainerStyle={styles.container}>
        <Route exact={true} path={['/', '/home']} component={HomeScreen} />
        <Route path="/about" component={AboutScreen} />
        <Route path="/settings" component={SettingsScreen} />
      </Content>
      <Footer>
        <FooterTab>
          {props.tabs.map(p => {
            const RouterButton = withRouter(({ history }) => (
              <ButtonIcon
                badgeText={p.badgeText}
                iconName={p.iconName}
                labelText={p.labelText}
                active={p.active}
                onPress={() => history.push(p.route)}
              />
            ));

            return <RouterButton key={p.iconName} />;
          })}
        </FooterTab>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
