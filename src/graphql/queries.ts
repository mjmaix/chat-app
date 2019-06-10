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
    updatedAt
    owner1
    owner2
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
      owner1
      owner2
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
      updatedAt
      owner1
      owner2
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
        updatedAt
        owner1
        owner2
      }
      createdAt
    }
    nextToken
  }
}
`;
export const getClUser = `query GetClUser($id: ID!) {
  getClUser(id: $id) {
    id
    username
  }
}
`;
export const listClUsers = `query ListClUsers(
  $filter: ModelClUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listClUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
    }
    nextToken
  }
}
`;
