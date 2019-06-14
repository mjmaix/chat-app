import { logInfo } from '../../core/reports';
import { NavigationService } from '../../utils';
import {
  handleGetCurrentIdentityId,
  handleGetCurrentUser,
  handleGetCurrentUserAttrs,
} from './authActions';
import { handleCreateClUser, handleUpdateClUser } from './mutationActions';
import { handleGetClUser } from './queryActions';

export const handlePressVerifyContact = async (contact: Contact) => {
  logInfo('[START] handlePressVerifyContact');
  const attributes = await handleGetCurrentUserAttrs();
  const contactValue = attributes[contact];
  NavigationService.navigate('VerifyContact', {
    contact,
    contactValue,
  });
};

export const handleClUserCreate = async () => {
  logInfo('[START] handleClUserCreate');
  const cognitoUser = await handleGetCurrentUser();
  const username = cognitoUser.getUsername();
  const response = await handleGetClUser(username);
  const userExists = response && response.getClUser;
  if (!userExists) {
    logInfo('Create ClUser entry');
    const identityId = await handleGetCurrentIdentityId();
    return handleCreateClUser(cognitoUser, identityId);
  }
};

export const handleClUserUpdate = async () => {
  logInfo('[START] handleClUserUpdate');
  const newUser = await handleGetCurrentUser();

  const identityId = await handleGetCurrentIdentityId();
  return handleUpdateClUser(newUser, identityId);
};
