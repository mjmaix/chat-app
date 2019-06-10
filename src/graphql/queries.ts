// tslint:disable
// this is an auto generated file. This will be overwritten

export const getClRoom = `query GetClRoom($id: ID!) {
  getClRoom(id: $id) {
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
export const listClRooms = `query ListClRooms(
  $filter: ModelClRoomFilterInput
  $limit: Int
  $nextToken: String
) {
  listClRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      messages {
        nextToken
      }
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getClMessage = `query GetClMessage($id: ID!) {
  getClMessage(id: $id) {
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
export const listClMessages = `query ListClMessages(
  $filter: ModelClMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listClMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      owner
      when
      roomId
      room {
        id
        createdAt
        updatedAt
      }
      createdAt
    }
    nextToken
  }
}
`;
