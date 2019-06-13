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
    createdAt
    updatedAt
  }
}
`;
export const onCreateClConvoLink = `subscription OnCreateClConvoLink($user: String!) {
  onCreateClConvoLink(user: $user) {
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
export const onCreateClUser = `subscription OnCreateClUser {
  onCreateClUser {
    id
    conversations {
      items {
        id
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
