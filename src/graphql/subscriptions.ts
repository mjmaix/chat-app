// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateClRoom = `subscription OnCreateClRoom {
  onCreateClRoom {
    id
    messages {
      items {
        id
        content
        owner
        when
        roomId
        createdAt
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const onUpdateClRoom = `subscription OnUpdateClRoom {
  onUpdateClRoom {
    id
    messages {
      items {
        id
        content
        owner
        when
        roomId
        createdAt
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const onDeleteClRoom = `subscription OnDeleteClRoom {
  onDeleteClRoom {
    id
    messages {
      items {
        id
        content
        owner
        when
        roomId
        createdAt
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const onCreateClMessage = `subscription OnCreateClMessage {
  onCreateClMessage {
    id
    content
    owner
    when
    roomId
    room {
      id
      messages {
        nextToken
      }
      createdAt
      updatedAt
    }
    createdAt
  }
}
`;
export const onUpdateClMessage = `subscription OnUpdateClMessage {
  onUpdateClMessage {
    id
    content
    owner
    when
    roomId
    room {
      id
      messages {
        nextToken
      }
      createdAt
      updatedAt
    }
    createdAt
  }
}
`;
export const onDeleteClMessage = `subscription OnDeleteClMessage {
  onDeleteClMessage {
    id
    content
    owner
    when
    roomId
    room {
      id
      messages {
        nextToken
      }
      createdAt
      updatedAt
    }
    createdAt
  }
}
`;
