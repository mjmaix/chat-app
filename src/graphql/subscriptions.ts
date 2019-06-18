// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateClMessage = `subscription OnCreateClMessage($clMessageConversationId: ID!) {
  onCreateClMessage(clMessageConversationId: $clMessageConversationId) {
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
          clMessageConversationId
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
          clMessageConversationId
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
    clMessageConversationId
    createdAt
    updatedAt
  }
}
`;
export const onCreateClConvoLink = `subscription OnCreateClConvoLink($clConvoLinkUserId: ID!) {
  onCreateClConvoLink(clConvoLinkUserId: $clConvoLinkUserId) {
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
          clMessageConversationId
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
          clMessageConversationId
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
export const onCreateClUser = `subscription OnCreateClUser {
  onCreateClUser {
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
        clMessageConversationId
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
        clMessageConversationId
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
        clMessageConversationId
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
