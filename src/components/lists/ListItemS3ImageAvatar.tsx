import React from 'react';
import { Avatar, AvatarProps } from 'react-native-elements';

import { StyleGuide } from '../../core';
import { PreviewAvatar } from '../Images/PreviewAvatar';

interface Props extends AvatarProps {
  user: Nullable<ClUser | ClUserWithConvos>;
}

const size = 'medium';
function ListItemS3ImageAvatar(props: Props) {
  const { user, ...props2 } = props;
  if (!user || !user.avatar) {
    return <Avatar size={size} {...props2} icon={StyleGuide.userIcon} />;
  }

  const ImageComponent = class extends React.Component<{}> {
    public render() {
      return (
        <PreviewAvatar
          editable={false}
          size={size}
          imgKey={user.avatar || 'default_image.jpg'}
          level={'protected'}
          identityId={user.identityId || ''}
          {...props2}
        />
      );
    }
  };

  return <Avatar size={size} ImageComponent={ImageComponent} {...props2} />;
}

export { ListItemS3ImageAvatar };
