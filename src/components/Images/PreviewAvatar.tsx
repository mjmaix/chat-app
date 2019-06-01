import React, { Fragment } from 'react';
import { Avatar, Text } from 'react-native-elements';
import { ImageURISource } from 'react-native';
import { AsyncImagePicker } from '../../utils';

export interface PreviewAvatarProps {
  handleChangeImage?: ((e: unknown) => void) | null | undefined;
  source?: ImageURISource | undefined;
  errorMessage?: string | undefined | null;
  handleTouched?: (v: boolean) => void;
}

// TODO: style errorMessage
export const PreviewAvatar = ({
  source,
  handleChangeImage,
  errorMessage,
  handleTouched,
  ...props
}: PreviewAvatarProps) => {
  return (
    <Fragment>
      <Avatar
        rounded
        showEditButton
        icon={{
          name: 'user',
          type: 'feather',
        }}
        size="xlarge"
        source={source}
        onEditPress={async () => {
          const picker = new AsyncImagePicker();
          const result = await picker.showImagePicker();
          if (handleChangeImage && result) {
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
