import { CurrentUserOpts } from '@aws-amplify/auth/lib/types';

import { isConnected } from '../utils/networkUtil';

export const asyncGetCurrentUserOpts = () =>
  isConnected()
    .then(() => ({ bypassCache: true }))
    .catch(() => ({ bypassCache: false }));

export const buildOpts = async (opts?: CurrentUserOpts) => {
  const netOpts = await asyncGetCurrentUserOpts();
  const builtOpts = {
    ...netOpts,
    ...opts,
  };
  return builtOpts;
};
