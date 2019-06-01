import React, { useState, Fragment } from 'react';
import { Avatar, Text } from 'react-native-elements';
import { ImageURISource } from 'react-native';

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
  const [preview, setPreview] = useState(source);
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
        onEditPress={() => {
          if (handleChangeImage) {
            handleChangeImage('https://placeimg.com/482/482/people');
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
