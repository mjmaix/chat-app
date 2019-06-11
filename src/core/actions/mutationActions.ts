import { ApolloQueryResult } from 'apollo-client/core/types';
import { FetchResult } from 'apollo-link';
import gql from 'graphql-tag';

import {
  CreateClUserMutation,
  CreateConvoLinkMutation,
  CreateConvoMutation,
} from '../../API';
import * as mutations from '../../graphql/mutations';
import { apolloClient as client } from '../../setup';
import { logReport as logRecord } from '../reports/index';

const assertErrors = (response: ApolloQueryResult<any> | FetchResult<any>) => {
  if (response && response.errors && response.errors.length > 0) {
    throw new Error(response.errors.join('\n'));
  }
};

export const handleCreateClUser = async (user: ChatCognitoUser) => {
  try {
    const response = await client.mutate<CreateClUserMutation>({
      mutation: gql(mutations.createClUser),
      variables: {
        input: {
          id: user.getUsername(),
          username: user.getUsername(),
        },
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

export const handleCreateConvo = async (
  user1: ChatUserAttributes,
  user2: ChatUserAttributes,
) => {
  try {
    const members = [user1, user2].sort();
    const conversationName = members.join(' and ');
    const conversationResponse = await client.mutate<CreateConvoMutation>({
      mutation: gql(mutations.createConvo),
      variables: {
        input: {
          name: conversationName,
          members,
        },
      },
    });
    assertErrors(conversationResponse);
    const userConversation1Response = await client.mutate<
      CreateConvoLinkMutation
    >({
      mutation: gql(mutations.createConvoLink),
      variables: {
        input: {
          convoLinkUserId: user1,
          convoLinkConversationId: conversationResponse.data.createConvo.id,
        },
      },
    });
    assertErrors(userConversation1Response);
    const userConversation2Response = await client.mutate<
      CreateConvoLinkMutation
    >({
      mutation: gql(mutations.createConvoLink),
      variables: {
        input: {
          convoLinkUserId: user2,
          convoLinkConversationId: conversationResponse.data.createConvo.id,
        },
      },
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
