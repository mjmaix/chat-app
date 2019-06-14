export const listContacts = `query ListContacts(
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
