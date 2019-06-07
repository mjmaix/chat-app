import { NavigationService } from '../../../utils';
import { asyncGetCurrentUserOpts } from '../../../utils/amplifyAuthUtils';
import { handleGetCurrentUserRawAttrs } from './authActions';

export const handlePressVerifyContact = async (contact: Contact) => {
  const opts = await asyncGetCurrentUserOpts();
  const attributes = await handleGetCurrentUserRawAttrs(opts);
  const contactValue = attributes[contact];
  NavigationService.navigate('VerifyContact', {
    contact,
    contactValue,
  });
};
