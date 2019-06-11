// tslint:disable
// this is an auto generated file. This will be overwritten

export const createClUser = `mutation CreateClUser($input: CreateClUserInput!) {
  createClUser(input: $input) {
    id
    username
    conversations {
      nextToken
    }
    messages {
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const updateClUser = `mutation UpdateClUser($input: UpdateClUserInput!) {
  updateClUser(input: $input) {
    id
    username
    conversations {
      nextToken
    }
    messages {
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const deleteClUser = `mutation DeleteClUser($input: DeleteClUserInput!) {
  deleteClUser(input: $input) {
    id
    username
    conversations {
      nextToken
    }
    messages {
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const createConvo = `mutation CreateConvo($input: CreateClConversationInput!) {
  createConvo(input: $input) {
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
}
`;
export const createClMessage = `mutation CreateClMessage($input: CreateClMessageInput!) {
  createClMessage(input: $input) {
    id
    author {
      id
      username
      createdAt
      updatedAt
    }
    authorId
    content
    conversation {
      id
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
      username
      createdAt
      updatedAt
    }
    authorId
    content
    conversation {
      id
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
      username
      createdAt
      updatedAt
    }
    authorId
    content
    conversation {
      id
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
      username
      createdAt
      updatedAt
    }
    convoLinkUserId
    conversation {
      id
      name
      members
      createdAt
      updatedAt
    }
    convoLinkConversationId
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
      username
      createdAt
      updatedAt
    }
    convoLinkUserId
    conversation {
      id
      name
      members
      createdAt
      updatedAt
    }
    convoLinkConversationId
    createdAt
    updatedAt
  }
}
`;
