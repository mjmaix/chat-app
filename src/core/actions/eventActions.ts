import { CurrentUserOpts } from '@aws-amplify/auth/lib/types';

import { logInfo } from '../../core/reports';
import { NavigationService } from '../../utils';
import { asyncGetCurrentUserOpts } from '../../utils/amplifyAuthUtils';
import {
  handleGetCurrentIdentityId,
  handleGetCurrentUser,
  handleGetCurrentUserAttrs,
} from './authActions';
import { handleCreateClUser, handleUpdateClUser } from './mutationActions';
import { handleGetClUser } from './queryActions';

export const handlePressVerifyContact = async (contact: Contact) => {
  const opts = await asyncGetCurrentUserOpts();
  const attributes = await handleGetCurrentUserAttrs(opts);
  const contactValue = attributes[contact];
  NavigationService.navigate('VerifyContact', {
    contact,
    contactValue,
  });
};

export const handleClUserCreate = async () => {
  const cognitoUser = await handleGetCurrentUser();
  const username = cognitoUser.getUsername();
  const userExists = await handleGetClUser(username);
  if (!userExists) {
    logInfo('Create ClUser entry');
    const identityId = await handleGetCurrentIdentityId();
    return handleCreateClUser(cognitoUser, identityId);
  }
};

export const handleClUserUpdate = async () => {
  const newUser = await asyncGetCurrentUserOpts().then(
    (opts: CurrentUserOpts) => handleGetCurrentUser(opts),
  );
  const identityId = await handleGetCurrentIdentityId();
  return handleUpdateClUser(newUser, identityId);
};
