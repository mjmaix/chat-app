// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateClUser = `subscription OnCreateClUser {
  onCreateClUser {
    id
    conversations {
      items {
        id
        convoLinkUserId
        createdAt
        updatedAt
      }
      nextToken
    }
    messages {
      items {
        id
        content
        messageConversationId
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
export const onUpdateClUser = `subscription OnUpdateClUser {
  onUpdateClUser {
    id
    conversations {
      items {
        id
        convoLinkUserId
        createdAt
        updatedAt
      }
      nextToken
    }
    messages {
      items {
        id
        content
        messageConversationId
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
export const onDeleteClUser = `subscription OnDeleteClUser {
  onDeleteClUser {
    id
    conversations {
      items {
        id
        convoLinkUserId
        createdAt
        updatedAt
      }
      nextToken
    }
    messages {
      items {
        id
        content
        messageConversationId
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
