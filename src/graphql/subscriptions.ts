// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateClRoom = `subscription OnCreateClRoom {
  onCreateClRoom {
    id
    messages {
      items {
        id
        content
        when
        roomId
        createdAt
      }
      nextToken
    }
    createdAt
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
        when
        roomId
        createdAt
      }
      nextToken
    }
    createdAt
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
        when
        roomId
        createdAt
      }
      nextToken
    }
    createdAt
  }
}
`;
export const onCreateClMessage = `subscription OnCreateClMessage {
  onCreateClMessage {
    id
    content
    when
    roomId
    room {
      id
      messages {
        nextToken
      }
      createdAt
    }
    createdAt
  }
}
`;
export const onUpdateClMessage = `subscription OnUpdateClMessage {
  onUpdateClMessage {
    id
    content
    when
    roomId
    room {
      id
      messages {
        nextToken
      }
      createdAt
    }
    createdAt
  }
}
`;
export const onDeleteClMessage = `subscription OnDeleteClMessage {
  onDeleteClMessage {
    id
    content
    when
    roomId
    room {
      id
      messages {
        nextToken
      }
      createdAt
    }
    createdAt
  }
}
`;
