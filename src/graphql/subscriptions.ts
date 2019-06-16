// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateClMessage = `subscription OnCreateClMessage($members: [String!]!) {
  onCreateClMessage(members: $members) {
    id
    author {
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
    content
    conversation {
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
    createdAt
    updatedAt
  }
}
`;
export const onCreateClConversation = `subscription OnCreateClConversation($members: String!) {
  onCreateClConversation(members: $members) {
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
export const onCreateClUser = `subscription OnCreateClUser {
  onCreateClUser {
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
export const onUpdateClUser = `subscription OnUpdateClUser {
  onUpdateClUser {
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
export const onDeleteClUser = `subscription OnDeleteClUser {
  onDeleteClUser {
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
