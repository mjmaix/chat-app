import { logInfo } from '../../../core';
import { NavigationService } from '../../../utils';
import { asyncGetCurrentUserOpts } from '../../../utils/amplifyAuthUtils';
import { handleGetCurrentUser, handleGetCurrentUserAttrs } from './authActions';
import { handleCreateClUser } from './mutationActions';
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

export const handleNewSignedInUser = async () => {
  const cognitoUser = await handleGetCurrentUser();
  const username = cognitoUser.getUsername();
  const userExists = await handleGetClUser(username);
  if (!userExists) {
    logInfo('Create ClUser entry');
    await handleCreateClUser(cognitoUser);
  }
};
