// tslint:disable
// this is an auto generated file. This will be overwritten

export const getClUser = `query GetClUser($id: ID!) {
  getClUser(id: $id) {
    id
    conversations {
      items {
        id
        clConvoLinkUserId
        clConvoLinkConversationId
        createdAt
        updatedAt
      }
      nextToken
    }
    messages {
      items {
        id
        content
        createdAt
        updatedAt
      }
      nextToken
    }
    givenName
    familyName
    email
    avatar
    identityId
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
      conversations {
        nextToken
      }
      messages {
        nextToken
      }
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
export const getClConversation = `query GetClConversation($id: ID!) {
  getClConversation(id: $id) {
    id
    messages {
      items {
        id
        content
        createdAt
        updatedAt
      }
      nextToken
    }
    associated {
      items {
        id
        clConvoLinkUserId
        clConvoLinkConversationId
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
export const listClConversations = `query ListClConversations(
  $filter: ModelClConversationFilterInput
  $limit: Int
  $nextToken: String
) {
  listClConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      messages {
        nextToken
      }
      associated {
        nextToken
      }
      name
      members
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
