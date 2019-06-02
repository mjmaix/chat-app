import React, { Fragment } from 'react';
import { ImageProperties, ImageURISource } from 'react-native';
import { Avatar, Text } from 'react-native-elements';

import { AsyncImagePicker } from '../../utils';

export interface PreviewAvatarProps {
  handleChangeImage?: ((e: unknown) => void) | null | undefined;
  source?: ImageURISource | undefined;
  errorMessage?: string | undefined | null;
  handleTouched?: (v: boolean) => void;
  isSubmitting?: boolean;
  imageProps?: Partial<ImageProperties>;
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
  } = props;

  return (
    <Fragment>
      <Avatar
        rounded
        imageProps={imageProps}
        showEditButton={!isSubmitting}
        icon={{
          name: 'user',
          type: 'feather',
        }}
        size="xlarge"
        source={source}
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
