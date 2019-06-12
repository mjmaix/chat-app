import gql from 'graphql-tag';

import { ApolloQueryResult } from '../../../node_modules/apollo-client/core/types';
import { GetClUserQuery, ListClUsersQuery } from '../../API';
import * as queries from '../../graphql/queries';
import { apolloClient as client } from '../../setup';
import { logReport as logRecord } from '../reports/index';

// TODO: cleanup and refactor

const assertErrors = (
  response: ApolloQueryResult<GetClUserQuery | ListClUsersQuery>,
) => {
  if (response && response.errors && response.errors.length > 0) {
    throw new Error(response.errors.join('\n'));
  }
};

export const handleGetClUser = async (username: string) => {
  try {
    const response = await client.query<GetClUserQuery>({
      query: gql(queries.getClUser),
      variables: { id: username },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    });
    assertErrors(response);
    return response.data.getClUser;
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
    return user ? user.conversations : null;
  } catch (e) {
    logRecord({
      name: 'GetUserError',
      attributes: {
        error: e.message,
      },
    });
  }
};

const listPublicClUsers = `query ListClUsers(
    $filter: ModelClUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
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

export const handleListClUsers = async () => {
  try {
    const response = await client.query<ListClUsersQuery>({
      query: gql(listPublicClUsers),
      variables: { limit: 100 },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    });
    assertErrors(response);
    return response.data.listClUsers;
  } catch (e) {
    logRecord({
      name: 'ListUserError',
      attributes: {
        error: e.message,
      },
    });
  }
};
