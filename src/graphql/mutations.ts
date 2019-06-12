// tslint:disable
// this is an auto generated file. This will be overwritten

export const createClUser = `mutation CreateClUser($input: CreateClUserInput!) {
  createClUser(input: $input) {
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
export const updateClUser = `mutation UpdateClUser($input: UpdateClUserInput!) {
  updateClUser(input: $input) {
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
export const deleteClUser = `mutation DeleteClUser($input: DeleteClUserInput!) {
  deleteClUser(input: $input) {
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
export const createConvo = `mutation CreateConvo($input: CreateClConversationInput!) {
  createConvo(input: $input) {
    id
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
    associated {
      items {
        id
        convoLinkUserId
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
export const createClMessage = `mutation CreateClMessage($input: CreateClMessageInput!) {
  createClMessage(input: $input) {
    id
    author {
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
    messageConversationId
    createdAt
    updatedAt
  }
}
`;
export const updateClMessage = `mutation UpdateClMessage($input: UpdateClMessageInput!) {
  updateClMessage(input: $input) {
    id
    author {
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
    messageConversationId
    createdAt
    updatedAt
  }
}
`;
export const deleteClMessage = `mutation DeleteClMessage($input: DeleteClMessageInput!) {
  deleteClMessage(input: $input) {
    id
    author {
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
    messageConversationId
    createdAt
    updatedAt
  }
}
`;
export const createConvoLink = `mutation CreateConvoLink($input: CreateClConvoLinkInput!) {
  createConvoLink(input: $input) {
    id
    user {
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
    convoLinkUserId
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
export const updateConvoLink = `mutation UpdateConvoLink($input: UpdateClConvoLinkInput!) {
  updateConvoLink(input: $input) {
    id
    user {
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
    convoLinkUserId
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
