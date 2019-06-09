// tslint:disable
// this is an auto generated file. This will be overwritten

export const createClRoom = `mutation CreateClRoom($input: CreateClRoomInput!) {
  createClRoom(input: $input) {
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
export const updateClRoom = `mutation UpdateClRoom($input: UpdateClRoomInput!) {
  updateClRoom(input: $input) {
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
export const deleteClRoom = `mutation DeleteClRoom($input: DeleteClRoomInput!) {
  deleteClRoom(input: $input) {
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
export const createClMessage = `mutation CreateClMessage($input: CreateClMessageInput!) {
  createClMessage(input: $input) {
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
export const updateClMessage = `mutation UpdateClMessage($input: UpdateClMessageInput!) {
  updateClMessage(input: $input) {
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
export const deleteClMessage = `mutation DeleteClMessage($input: DeleteClMessageInput!) {
  deleteClMessage(input: $input) {
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
