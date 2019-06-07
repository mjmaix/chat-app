import { handleCheckVerifiedContact } from '../core/amplify/actions/authActions';
import { isConnected } from '../utils/networkUtil';

export const asyncGetCurrentUserOpts = () =>
  isConnected()
    .then(() => ({ bypassCache: true }))
    .catch(() => ({ bypassCache: false }));

export const asyncIsContactVerified = async (contact: Contact) => {
  const opts = await asyncGetCurrentUserOpts();
  const status: VerifiedContact = await handleCheckVerifiedContact(opts);
  return !!(status && status.verified && status.verified[contact]);
};
