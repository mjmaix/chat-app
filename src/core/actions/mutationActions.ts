import { ApolloQueryResult } from 'apollo-client/core/types';
import { FetchResult } from 'apollo-link';
import gql from 'graphql-tag';

import {
  CreateClConvoLinkMutation,
  CreateClConvoMutation,
  CreateClConvoMutationVariables,
  CreateClUserMutation,
  CreateClUserMutationVariables,
  UpdateClUserMutation,
  UpdateClUserMutationVariables,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import { apolloClient as client } from '../../setup';
import { logReport as logRecord } from '../reports/index';

const assertErrors = (response: ApolloQueryResult<any> | FetchResult<any>) => {
  if (response && response.errors && response.errors.length > 0) {
    throw new Error(response.errors.join('\n'));
  }
};

export const handleCreateClUser = async (
  user: ChatCognitoUser,
  identityId?: string,
) => {
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
    return response.data.createUser;
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
    return response.data.updateClUser;
  } catch (e) {
    logRecord({
      name: 'UpdateUserError',
      attributes: {
        error: e.message,
      },
    });
  }
};

export const handleCreateConvo = async (
  user1: ChatUserAttributes,
  user2: ChatUserAttributes,
) => {
  try {
    const members = [user1, user2].sort();
    const conversationName = members.join(' and ');
    const conversationResponse = await client.mutate<
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
    const userConversation1Response = await client.mutate<
      CreateClConvoLinkMutation
    >({
      mutation: gql(mutations.createClConvoLink),
      variables: {
        input: {
          convoLinkUserId: user1,
          convoLinkConversationId: conversationResponse.data.createConvo.id,
        },
      },
    });
    assertErrors(userConversation1Response);
    const userConversation2Response = await client.mutate<
      CreateClConvoLinkMutation
    >({
      mutation: gql(mutations.createClConvoLink),
      variables: {
        input: {
          convoLinkUserId: user2,
          convoLinkConversationId: conversationResponse.data.createConvo.id,
        },
      },
      fetchPolicy: __DEV__ ? 'no-cache' : undefined,
    });
    assertErrors(userConversation2Response);
  } catch (e) {
    logRecord({
      name: 'CreateConvoError',
      attributes: {
        error: e.message,
      },
    });
  }
};

export const handleCreateMessage = async (message: string) => {
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
