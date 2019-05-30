import { YellowBox } from 'react-native';
import Amplify from 'aws-amplify';
import awsmobile from '../aws-exports';

YellowBox.ignoreWarnings(['Warning: Async']);

Amplify.configure(awsmobile);
