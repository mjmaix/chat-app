export const getClUserWithConvos = `query GetClUserWithConvos($id: ID!) {
    getClUser(id: $id) {
      id
      convoLinks {
        items {
          id
          clConvoLinkUserId
          conversation {
            id
            name
            members
            createdAt
            updatedAt
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
          }
          clConvoLinkConversationId
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

export const listClConversationsWithAuthor = `query ListClConversationsWithAuthor(
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
