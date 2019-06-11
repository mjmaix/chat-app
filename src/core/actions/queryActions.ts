import gql from 'graphql-tag';

import { ApolloQueryResult } from '../../../node_modules/apollo-client/core/types';
import { GetClUserQuery } from '../../API';
import * as queries from '../../graphql/queries';
import { apolloClient as client } from '../../setup';
import { logReport as logRecord } from '../reports/index';

const assertErrors = (response: ApolloQueryResult<GetClUserQuery>) => {
  if (response && response.errors && response.errors.length > 0) {
    throw new Error(response.errors.join('\n'));
  }
};

export const handleGetClUser = async (username: string) => {
  try {
    const response = await client.query<GetClUserQuery>({
      query: gql(queries.getClUser),
      variables: { id: username },
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
