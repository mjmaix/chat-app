import { S3Image } from 'aws-amplify-react-native';
import React from 'react';

interface PreviewS3ImageProps {
  imgKey: string;
  level?: string;
}
class PreviewS3Image extends React.Component<PreviewS3ImageProps, {}> {
  public render() {
    const { imgKey, level } = this.props;
    return <S3Image imgKey={imgKey} level={level} style={{ flex: 1 }} />;
  }
}

export { PreviewS3Image };
