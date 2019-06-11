// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateClUser = `subscription OnCreateClUser {
  onCreateClUser {
    id
    username
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
    createdAt
    updatedAt
  }
}
`;
export const onUpdateClUser = `subscription OnUpdateClUser {
  onUpdateClUser {
    id
    username
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
    createdAt
    updatedAt
  }
}
`;
export const onDeleteClUser = `subscription OnDeleteClUser {
  onDeleteClUser {
    id
    username
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
    createdAt
    updatedAt
  }
}
`;
