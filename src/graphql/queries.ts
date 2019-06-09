// tslint:disable
// this is an auto generated file. This will be overwritten

export const getClRoom = `query GetClRoom($id: ID!) {
  getClRoom(id: $id) {
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
    }
    nextToken
  }
}
`;
export const getClMessage = `query GetClMessage($id: ID!) {
  getClMessage(id: $id) {
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
export const listClMessages = `query ListClMessages(
  $filter: ModelClMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listClMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      when
      roomId
      room {
        id
        createdAt
      }
      createdAt
    }
    nextToken
  }
}
`;
