import {
  NavigationActions,
  NavigationContainerComponent,
} from 'react-navigation';

import { ScreenName } from '../routes/mappings';

let navigator: Nullable<NavigationContainerComponent>;

function setTopLevelNavigator(
  navigatorRef: Nullable<NavigationContainerComponent>,
) {
  navigator = navigatorRef;
}

function navigate(routeName: ScreenName, params?: any) {
  if (navigator) {
    navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  }
}

function goBack() {
  if (navigator) {
    navigator.dispatch(NavigationActions.back());
  }
}

export const NavigationService = {
  goBack,
  navigate,
  setTopLevelNavigator,
};
