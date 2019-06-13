import gql from 'graphql-tag';

import { ApolloQueryResult } from '../../../node_modules/apollo-client/core/types';
import {
  GetClUserQuery,
  GetClUserQueryVariables,
  ListClUsersQuery,
} from '../../API';
import * as queries from '../../graphql/queries';
import { apolloClient as client } from '../../setup';
import { logReport as logRecord } from '../reports/index';

const assertErrors = (
  response: ApolloQueryResult<GetClUserQuery | ListClUsersQuery>,
) => {
  if (response && response.errors && response.errors.length > 0) {
    throw new Error(response.errors.join('\n'));
  }
};

export const handleGetClUser = async (username: string) => {
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

export const handleListClUserConvos = async (username: string) => {
  try {
    const user = await handleGetClUser(username);
    return user && user.getClUser ? user.getClUser.conversations : null;
  } catch (e) {
    logRecord({
      name: 'GetUserError',
      attributes: {
        error: e.message,
      },
    });
  }
};

// FIXME: refactor or try to create own query
const listContacts = `query ListContacts(
    $filter: ModelClUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        givenName
        familyName
        email
        avatar
        identityId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const handleListContacts = async (user: ChatCognitoUser) => {
  try {
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
