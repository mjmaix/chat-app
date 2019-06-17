import React from 'react';
import { Avatar } from 'react-native-elements';

import { StyleGuide } from '../../core';
import { PreviewAvatar } from '../Images/PreviewAvatar';

const size = 'medium';
function ListItemS3ImageAvatar(props: {
  user: Nullable<ClUser | ClUserWithConvos>;
}) {
  const { user } = props;
  if (!user || !user.avatar) {
    return <Avatar size={size} rounded icon={StyleGuide.userIcon} />;
  }

  const ImageComponent = class extends React.Component<{}> {
    public render() {
      return (
        <PreviewAvatar
          editable={false}
          rounded={false}
          size={size}
          imgKey={user.avatar || 'default_image.jpg'}
          level={'protected'}
          identityId={user.identityId || ''}
        />
      );
    }
  };

  return <Avatar size={size} ImageComponent={ImageComponent} />;
}

export { ListItemS3ImageAvatar };
