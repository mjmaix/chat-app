// tslint:disable
// this is an auto generated file. This will be overwritten

export const getClUser = `query GetClUser($id: ID!) {
  getClUser(id: $id) {
    id
    conversations {
      items {
        id
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
    username
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
export const getClConvo = `query GetClConvo($id: ID!) {
  getClConvo(id: $id) {
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
