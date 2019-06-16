import gql from 'graphql-tag';

import { ApolloQueryResult } from '../../../node_modules/apollo-client/core/types';
import {
  GetClConversationQuery,
  GetClUserQuery,
  GetClUserQueryVariables,
  ListClConversationsQuery,
  ListClConversationsQueryVariables,
  ListClUsersQuery,
} from '../../API';
import { handleGetCurrentUser } from '../../core';
import { listContacts } from '../../graphql/publicOnlyQueries';
import * as queries from '../../graphql/queries';
import { listClConversations } from '../../graphql/queries';
import { apolloClient as client } from '../../setup';
import { logInfo, logRecord } from '../reports';

const assertErrors = (
  response: ApolloQueryResult<
    | GetClUserQuery
    | ListClUsersQuery
    | GetClConversationQuery
    | ListClConversationsQuery
  >,
) => {
  if (response && response.errors && response.errors.length > 0) {
    throw new Error(response.errors.join('\n'));
  }
};

export const handleGetClUser = async (username: string) => {
  logInfo('[START] handleGetClUser');
  try {
    const response = await client.query<
      GetClUserQuery,
      GetClUserQueryVariables
    >({
      query: gql(queries.getClUser),
      variables: { id: username },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    });
    assertErrors(response);
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

export const handleListClConversations = async (username: string) => {
  logInfo('[START] handleListClConversations');
  try {
    const response = await client.query<
      ListClConversationsQuery,
      ListClConversationsQueryVariables
    >({
      query: gql(queries.listClConversations),
      variables: {
        filter: {
          members: {
            contains: username,
          },
        },
      },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    });
    assertErrors(response);
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

export const handleListClUserConvoLinks = async (username: string) => {
  logInfo('[START] handleListClUserConvos');
  try {
    const user = await handleGetClUser(username);
    const clUser = user && user.getClUser;
    return clUser ? clUser.conversations : null;
  } catch (e) {
    logRecord({
      name: 'GetUserError',
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
    assertErrors(response);
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
