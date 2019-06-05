import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';
import { S3Image } from 'aws-amplify-react-native';
import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import { logInfo } from '../../core';
import { getNetInfo } from '../../utils';
import { containerStyles } from '../commonStyles';

interface PreviewS3ImageProps {
  imgKey: string;
  level?: string;
}
interface PreviewS3ImageState {
  isConnected: boolean;
  type?: NetInfoStateType;
}

// TODO: re-write S3Image - remove or make use of auto upload feature
class PreviewS3Image extends React.Component<
  PreviewS3ImageProps,
  PreviewS3ImageState
> {
  public readonly state = {
    isConnected: false,
  };
  public componentDidMount() {
    getNetInfo().then(state => {
      logInfo('Connection', state.isConnected, state.type);
      this.setState({ isConnected: state.isConnected, type: state.type });
    });
  }
  public render() {
    if (!this.state.isConnected) {
      return (
        <View style={containerStyles.fullCenter}>
          <Icon type={'material-community'} name={'signal-off'} size={80} />
        </View>
      );
    }
    const { imgKey, level } = this.props;
    return <S3Image imgKey={imgKey} level={level} style={{ flex: 1 }} />;
  }
}

export { PreviewS3Image };
