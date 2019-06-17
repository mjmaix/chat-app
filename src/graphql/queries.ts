// tslint:disable
// this is an auto generated file. This will be overwritten

export const getClUser = `query GetClUser($id: ID!) {
  getClUser(id: $id) {
    id
    convoLinks {
      items {
        id
        user {
          id
          givenName
          familyName
          email
          avatar
          identityId
          createdAt
          updatedAt
        }
        clConvoLinkUserId
        conversation {
          id
          name
          members
          createdAt
          updatedAt
        }
        clConvoLinkConversationId
        createdAt
        updatedAt
      }
      nextToken
    }
    messages {
      items {
        id
        author {
          id
          givenName
          familyName
          email
          avatar
          identityId
          createdAt
          updatedAt
        }
        content
        conversation {
          id
          name
          members
          createdAt
          updatedAt
        }
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
      convoLinks {
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
        author {
          id
          givenName
          familyName
          email
          avatar
          identityId
          createdAt
          updatedAt
        }
        content
        conversation {
          id
          name
          members
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
    associated {
      items {
        id
        user {
          id
          givenName
          familyName
          email
          avatar
          identityId
          createdAt
          updatedAt
        }
        clConvoLinkUserId
        conversation {
          id
          name
          members
          createdAt
          updatedAt
        }
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
    nextToken
  }
}
`;
