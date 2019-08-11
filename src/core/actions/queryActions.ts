import gql from 'graphql-tag';

import {
  GetClUserWithConvosQuery,
  GetClUserWithConvosQueryVariables,
  ListClConversationsWithAuthorQuery,
  ListClConversationsWithAuthorQueryVariables,
  ListClUsersQuery,
} from '../../API';
import { handleGetCurrentUser } from '../../core/actions/authActions';
import {
  getClUserWithConvos,
  listClConversationsWithAuthor,
} from '../../graphql/protectedOnlyQueries';
import { listContacts } from '../../graphql/publicOnlyQueries';
import { apolloClient as client } from '../../setup';
import { logInfo, logRecord } from '../reports';

export const handleGetClUser = async (username: string) => {
  logInfo('[START] handleGetClUser');
  try {
    const response = await client.query<
      GetClUserWithConvosQuery,
      GetClUserWithConvosQueryVariables
    >({
      query: gql(getClUserWithConvos),
      variables: { id: username },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    });
    return response.data;
  } catch (e) {
    logRecord({
      name: 'GetUserError',
      attributes: {
        error: e.message,
      },
    });
  }
};

export const handleListClConversations = async (user1: string) => {
  logInfo('[START] handleListClConversations');
  try {
    const response = await client.query<
      ListClConversationsWithAuthorQuery,
      ListClConversationsWithAuthorQueryVariables
    >({
      query: gql(listClConversationsWithAuthor),
      variables: {
        filter: {
          members: {
            contains: user1,
          },
        },
      },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    });
    return response.data;
  } catch (e) {
    logRecord({
      name: 'ListClConversationsError',
      attributes: {
        error: e.message,
      },
    });
  }
};

export const handleListContacts = async () => {
  logInfo('[START] handleListContacts');
  try {
    const user = await handleGetCurrentUser();
    const response = await client.query<ListClUsersQuery>({
      query: gql(listContacts),
      variables: { limit: 100, filter: { id: { ne: user.getUsername() } } },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    });
    return response.data;
  } catch (e) {
    logRecord({
      name: 'ListUserError',
      attributes: {
        error: e.message,
      },
    });
  }
};
