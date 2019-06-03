import React, { Fragment } from 'react';
import { ImageProperties, ImageURISource } from 'react-native';
import { Avatar, Text } from 'react-native-elements';

import { AsyncImagePicker } from '../../utils';
import { PreviewS3Image } from './PreviewS3Image';

export interface PreviewAvatarProps {
  handleChangeImage?: ((e: unknown) => void) | null | undefined;
  source?: ImageURISource | undefined;
  errorMessage?: string | undefined | null;
  handleTouched?: (v: boolean) => void;
  isSubmitting?: boolean;
  imageProps?: Partial<ImageProperties>;
  imgKey?: string;
  level?: 'private' | 'protected' | 'public';
}

// TODO: style errorMessage
export const PreviewAvatar = (props: PreviewAvatarProps) => {
  const {
    source,
    handleChangeImage,
    errorMessage,
    handleTouched,
    isSubmitting,
    imageProps,
    imgKey,
    level,
  } = props;

  const icon = {
    name: 'user',
    type: 'feather',
  };

  const ImgComp = imgKey
    ? class extends React.Component {
        public render() {
          return (
            <PreviewS3Image imgKey={imgKey} level={level || 'protected'} />
          );
        }
      }
    : undefined;
  return (
    <Fragment>
      <Avatar
        ImageComponent={imgKey ? ImgComp : undefined}
        icon={imgKey ? undefined : icon}
        source={imgKey ? undefined : source}
        showEditButton={!isSubmitting}
        rounded
        imageProps={imageProps}
        size="xlarge"
        onEditPress={async () => {
          const picker = new AsyncImagePicker();
          const result = await picker.showImagePicker();
          if (handleChangeImage && result && !result.didCancel) {
            handleChangeImage(result.uri);
          }
          if (handleTouched) {
            handleTouched(true);
          }
        }}
      />
      {!!errorMessage && <Text>{errorMessage}</Text>}
    </Fragment>
  );
};
