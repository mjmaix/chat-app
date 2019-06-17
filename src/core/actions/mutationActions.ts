import { ApolloCurrentResult } from 'apollo-client';
import { ApolloQueryResult } from 'apollo-client/core/types';
import { FetchResult } from 'apollo-link';
import gql from 'graphql-tag';

import {
  CreateClConvoLinkMutation,
  CreateClConvoLinkMutationVariables,
  CreateClConvoMutation,
  CreateClConvoMutationVariables,
  CreateClUserMutation,
  CreateClUserMutationVariables,
  UpdateClUserMutation,
  UpdateClUserMutationVariables,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import { createClConvoLinkPublic } from '../../graphql/publicOnlyMutations';
import { apolloClient as client } from '../../setup';
import { logInfo } from '../reports';
import { logRecord } from '../reports/index';

interface DataWrapper<T> extends ApolloCurrentResult<T> {
  data: T;
}

const assertErrors = (response: ApolloQueryResult<any> | FetchResult<any>) => {
  if (response && response.errors && response.errors.length > 0) {
    throw new Error(response.errors.join('\n'));
  }
};

export const handleCreateClUser = async (
  user: ChatCognitoUser,
  identityId?: string,
) => {
  logInfo('[START] handleCreateClUser');
  const newUser = {
    id: user.getUsername(),
    email: user.attributes.email,
    familyName: user.attributes.family_name,
    givenName: user.attributes.given_name,
    avatar: user.attributes.picture,
    identityId,
  };
  try {
    const response = await client.mutate<
      CreateClUserMutation,
      CreateClUserMutationVariables
    >({
      mutation: gql(mutations.createClUser),
      optimisticResponse: { __typename: 'ClUser', createClUser: newUser },
      variables: {
        input: newUser,
      },
    });
    assertErrors(response);
    return response;
  } catch (e) {
    logRecord({
      name: 'CreateUserError',
      attributes: {
        error: e.message,
      },
    });
  }
};

export const handleUpdateClUser = async (
  user: ChatCognitoUser,
  identityId?: string,
) => {
  logInfo('[START] handleUpdateClUser');
  try {
    const newUser = {
      id: user.getUsername(),
      email: user.attributes.email,
      familyName: user.attributes.family_name,
      givenName: user.attributes.given_name,
      avatar: user.attributes.picture,
      identityId,
    };
    const response = await client.mutate<
      UpdateClUserMutation,
      UpdateClUserMutationVariables
    >({
      mutation: gql(mutations.updateClUser),
      // TODO: test first
      // optimisticResponse: { __typename: 'ClUser', updateClUser: newUser },
      variables: {
        input: newUser,
      },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    });
    assertErrors(response);
    return response;
  } catch (e) {
    logRecord({
      name: 'UpdateUserError',
      attributes: {
        error: e.message,
      },
    });
  }
};

export const handleCreateConvo = async <
  T1 extends CreateClConvoMutation = CreateClConvoMutation,
  T2 extends CreateClConvoLinkMutation = CreateClConvoLinkMutation
>(
  user1: string,
  user2: string,
) => {
  logInfo('[START] handleCreateConvo');
  let conversationResponse: Nullable<DataWrapper<T1>> = null;
  let userConversation1Response: Nullable<DataWrapper<T2>> = null;
  let userConversation2Response: Nullable<DataWrapper<T2>> = null;

  try {
    const members = [user1, user2].sort();
    const conversationName = members.join(' and ');
    conversationResponse = await client.mutate<
      CreateClConvoMutation,
      CreateClConvoMutationVariables
    >({
      mutation: gql(mutations.createClConvo),
      variables: {
        input: {
          name: conversationName,
          members,
        },
      },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    });
    assertErrors(conversationResponse);
  } catch (e) {
    logRecord({
      name: 'CreateConvoError',
      attributes: {
        error: e.message,
      },
    });
  }
  let createClConvo;

  if (
    conversationResponse &&
    conversationResponse.data &&
    conversationResponse.data.createClConvo
  ) {
    createClConvo = conversationResponse.data.createClConvo;
  }

  if (createClConvo) {
    try {
      userConversation1Response = await client.mutate<
        CreateClConvoLinkMutation,
        CreateClConvoLinkMutationVariables
      >({
        mutation: gql(mutations.createClConvoLink),
        variables: {
          input: {
            clConvoLinkUserId: user1,
            clConvoLinkConversationId: createClConvo.id,
          },
        },
      });
      assertErrors(userConversation1Response);
    } catch (e) {
      logRecord({
        name: 'CreateConvoLink1Error',
        attributes: {
          error: e.message,
        },
      });
    }
  }

  if (createClConvo) {
    try {
      userConversation2Response = await client.mutate<
        CreateClConvoLinkMutation,
        CreateClConvoLinkMutationVariables
      >({
        mutation: gql(createClConvoLinkPublic),
        variables: {
          input: {
            clConvoLinkUserId: user2,
            clConvoLinkConversationId: createClConvo.id,
          },
        },
        fetchPolicy: __DEV__ ? 'no-cache' : undefined,
      });
      assertErrors(userConversation2Response);
    } catch (e) {
      logRecord({
        name: 'CreateConvoLink2Error',
        attributes: {
          error: e.message,
        },
      });
    }
  }

  return [
    conversationResponse,
    userConversation1Response,
    userConversation2Response,
  ];
};

export const handleCreateMessage = async (message: string) => {
  logInfo('[START] handleCreateMessage');
  try {
    const response = await client.mutate({
      mutation: gql(mutations.createClMessage),
      variables: {
        input: message,
      },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    });
    assertErrors(response);
    return response.data.createMessage;
  } catch (e) {
    logRecord({
      name: 'CreateMessageError',
      attributes: {
        error: e.message,
      },
    });
  }
};
