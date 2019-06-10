// tslint:disable
// this is an auto generated file. This will be overwritten

export const createClRoom = `mutation CreateClRoom($input: CreateClRoomInput!) {
  createClRoom(input: $input) {
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
export const updateClRoom = `mutation UpdateClRoom($input: UpdateClRoomInput!) {
  updateClRoom(input: $input) {
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
export const deleteClRoom = `mutation DeleteClRoom($input: DeleteClRoomInput!) {
  deleteClRoom(input: $input) {
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
export const createClMessage = `mutation CreateClMessage($input: CreateClMessageInput!) {
  createClMessage(input: $input) {
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
export const updateClMessage = `mutation UpdateClMessage($input: UpdateClMessageInput!) {
  updateClMessage(input: $input) {
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
export const deleteClMessage = `mutation DeleteClMessage($input: DeleteClMessageInput!) {
  deleteClMessage(input: $input) {
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
