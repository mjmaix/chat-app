// eslint-disable
// this is an auto generated file. This will be overwritten

export const getClUser = `query GetClUser($id: ID!) {
  getClUser(id: $id) {
    id
    username
    conversations {
      items {
        id
        convoLinkUserId
        convoLinkConversationId
        createdAt
        updatedAt
      }
      nextToken
    }
    messages {
      items {
        id
        authorId
        content
        messageConversationId
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const listClUsers = `query ListClUsers(
  $filter: ModelClUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listClUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      conversations {
        nextToken
      }
      messages {
        nextToken
      }
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getConvo = `query GetConvo($id: ID!) {
  getConvo(id: $id) {
    id
    messages {
      items {
        id
        authorId
        content
        messageConversationId
        createdAt
        updatedAt
      }
      nextToken
    }
    associated {
      items {
        id
        convoLinkUserId
        convoLinkConversationId
        createdAt
        updatedAt
      }
      nextToken
    }
    name
    members
    createdAt
    updatedAt
  }
}
`;
