// tslint:disable
// this is an auto generated file. This will be overwritten

export const createClUser = `mutation CreateClUser($input: CreateClUserInput!) {
  createClUser(input: $input) {
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
export const updateClUser = `mutation UpdateClUser($input: UpdateClUserInput!) {
  updateClUser(input: $input) {
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
export const deleteClUser = `mutation DeleteClUser($input: DeleteClUserInput!) {
  deleteClUser(input: $input) {
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
export const createClConvo = `mutation CreateClConvo($input: CreateClConversationInput!) {
  createClConvo(input: $input) {
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
export const createClMessage = `mutation CreateClMessage($input: CreateClMessageInput!) {
  createClMessage(input: $input) {
    id
    author {
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
    content
    conversation {
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
    content
    conversation {
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
    content
    conversation {
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
    createdAt
    updatedAt
  }
}
`;
export const createClConvoLink = `mutation CreateClConvoLink($input: CreateClConvoLinkInput!) {
  createClConvoLink(input: $input) {
    id
    user {
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
    clConvoLinkUserId
    conversation {
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
    clConvoLinkConversationId
    createdAt
    updatedAt
  }
}
`;
export const updateClConvoLink = `mutation UpdateClConvoLink($input: UpdateClConvoLinkInput!) {
  updateClConvoLink(input: $input) {
    id
    user {
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
    clConvoLinkUserId
    conversation {
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
    clConvoLinkConversationId
    createdAt
    updatedAt
  }
}
`;
