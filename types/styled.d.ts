// import original module declarations
import 'styled-components';
import { Theme } from '../src/core/themes/themes';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
  export interface ThemedComponentProps {
    theme: DefaultTheme;
  }
}
