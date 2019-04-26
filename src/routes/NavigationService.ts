import {
  NavigationActions,
  NavigationContainerComponent,
} from 'react-navigation';
import { Nullable } from '../core/ts';

let navigator: Nullable<NavigationContainerComponent>;

function setTopLevelNavigator(
  navigatorRef: Nullable<NavigationContainerComponent>,
) {
  navigator = navigatorRef;
}

function navigate(routeName: string, params: any) {
  if (navigator) {
    navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  }
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};
