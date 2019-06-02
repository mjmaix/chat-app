import Amplify from 'aws-amplify';
import { YellowBox } from 'react-native';

import awsmobile from '../aws-exports';

YellowBox.ignoreWarnings(['Warning: Async']);

Amplify.configure(awsmobile);
