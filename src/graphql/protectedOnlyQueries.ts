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
