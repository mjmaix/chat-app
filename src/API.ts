/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateClRoomInput = {
  id?: string | null;
  createdAt?: string | null;
};

export type UpdateClRoomInput = {
  id: string;
  createdAt?: string | null;
};

export type DeleteClRoomInput = {
  id?: string | null;
};

export type CreateClMessageInput = {
  id?: string | null;
  content: string;
  when: string;
  roomId?: string | null;
  createdAt?: string | null;
};

export type UpdateClMessageInput = {
  id: string;
  content?: string | null;
  when?: string | null;
  roomId?: string | null;
  createdAt?: string | null;
};

export type DeleteClMessageInput = {
  id?: string | null;
};

export type ModelClRoomFilterInput = {
  id?: ModelIDFilterInput | null;
  createdAt?: ModelStringFilterInput | null;
  and?: Array<ModelClRoomFilterInput | null> | null;
  or?: Array<ModelClRoomFilterInput | null> | null;
  not?: ModelClRoomFilterInput | null;
};

export type ModelIDFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelStringFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelClMessageFilterInput = {
  id?: ModelIDFilterInput | null;
  content?: ModelStringFilterInput | null;
  when?: ModelStringFilterInput | null;
  roomId?: ModelIDFilterInput | null;
  createdAt?: ModelStringFilterInput | null;
  and?: Array<ModelClMessageFilterInput | null> | null;
  or?: Array<ModelClMessageFilterInput | null> | null;
  not?: ModelClMessageFilterInput | null;
};

export type CreateClRoomMutationVariables = {
  input: CreateClRoomInput;
};

export type CreateClRoomMutation = {
  createClRoom: {
    __typename: 'ClRoom';
    id: string;
    messages: {
      __typename: 'ModelClMessageConnection';
      items: Array<{
        __typename: 'ClMessage';
        id: string;
        content: string;
        when: string;
        roomId: string | null;
        createdAt: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string | null;
  } | null;
};

export type UpdateClRoomMutationVariables = {
  input: UpdateClRoomInput;
};

export type UpdateClRoomMutation = {
  updateClRoom: {
    __typename: 'ClRoom';
    id: string;
    messages: {
      __typename: 'ModelClMessageConnection';
      items: Array<{
        __typename: 'ClMessage';
        id: string;
        content: string;
        when: string;
        roomId: string | null;
        createdAt: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string | null;
  } | null;
};

export type DeleteClRoomMutationVariables = {
  input: DeleteClRoomInput;
};

export type DeleteClRoomMutation = {
  deleteClRoom: {
    __typename: 'ClRoom';
    id: string;
    messages: {
      __typename: 'ModelClMessageConnection';
      items: Array<{
        __typename: 'ClMessage';
        id: string;
        content: string;
        when: string;
        roomId: string | null;
        createdAt: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string | null;
  } | null;
};

export type CreateClMessageMutationVariables = {
  input: CreateClMessageInput;
};

export type CreateClMessageMutation = {
  createClMessage: {
    __typename: 'ClMessage';
    id: string;
    content: string;
    when: string;
    roomId: string | null;
    room: {
      __typename: 'ClRoom';
      id: string;
      messages: {
        __typename: 'ModelClMessageConnection';
        nextToken: string | null;
      } | null;
      createdAt: string | null;
    } | null;
    createdAt: string | null;
  } | null;
};

export type UpdateClMessageMutationVariables = {
  input: UpdateClMessageInput;
};

export type UpdateClMessageMutation = {
  updateClMessage: {
    __typename: 'ClMessage';
    id: string;
    content: string;
    when: string;
    roomId: string | null;
    room: {
      __typename: 'ClRoom';
      id: string;
      messages: {
        __typename: 'ModelClMessageConnection';
        nextToken: string | null;
      } | null;
      createdAt: string | null;
    } | null;
    createdAt: string | null;
  } | null;
};

export type DeleteClMessageMutationVariables = {
  input: DeleteClMessageInput;
};

export type DeleteClMessageMutation = {
  deleteClMessage: {
    __typename: 'ClMessage';
    id: string;
    content: string;
    when: string;
    roomId: string | null;
    room: {
      __typename: 'ClRoom';
      id: string;
      messages: {
        __typename: 'ModelClMessageConnection';
        nextToken: string | null;
      } | null;
      createdAt: string | null;
    } | null;
    createdAt: string | null;
  } | null;
};

export type GetClRoomQueryVariables = {
  id: string;
};

export type GetClRoomQuery = {
  getClRoom: {
    __typename: 'ClRoom';
    id: string;
    messages: {
      __typename: 'ModelClMessageConnection';
      items: Array<{
        __typename: 'ClMessage';
        id: string;
        content: string;
        when: string;
        roomId: string | null;
        createdAt: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string | null;
  } | null;
};

export type ListClRoomsQueryVariables = {
  filter?: ModelClRoomFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListClRoomsQuery = {
  listClRooms: {
    __typename: 'ModelClRoomConnection';
    items: Array<{
      __typename: 'ClRoom';
      id: string;
      messages: {
        __typename: 'ModelClMessageConnection';
        nextToken: string | null;
      } | null;
      createdAt: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type GetClMessageQueryVariables = {
  id: string;
};

export type GetClMessageQuery = {
  getClMessage: {
    __typename: 'ClMessage';
    id: string;
    content: string;
    when: string;
    roomId: string | null;
    room: {
      __typename: 'ClRoom';
      id: string;
      messages: {
        __typename: 'ModelClMessageConnection';
        nextToken: string | null;
      } | null;
      createdAt: string | null;
    } | null;
    createdAt: string | null;
  } | null;
};

export type ListClMessagesQueryVariables = {
  filter?: ModelClMessageFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListClMessagesQuery = {
  listClMessages: {
    __typename: 'ModelClMessageConnection';
    items: Array<{
      __typename: 'ClMessage';
      id: string;
      content: string;
      when: string;
      roomId: string | null;
      room: {
        __typename: 'ClRoom';
        id: string;
        createdAt: string | null;
      } | null;
      createdAt: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnCreateClRoomSubscription = {
  onCreateClRoom: {
    __typename: 'ClRoom';
    id: string;
    messages: {
      __typename: 'ModelClMessageConnection';
      items: Array<{
        __typename: 'ClMessage';
        id: string;
        content: string;
        when: string;
        roomId: string | null;
        createdAt: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string | null;
  } | null;
};

export type OnUpdateClRoomSubscription = {
  onUpdateClRoom: {
    __typename: 'ClRoom';
    id: string;
    messages: {
      __typename: 'ModelClMessageConnection';
      items: Array<{
        __typename: 'ClMessage';
        id: string;
        content: string;
        when: string;
        roomId: string | null;
        createdAt: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string | null;
  } | null;
};

export type OnDeleteClRoomSubscription = {
  onDeleteClRoom: {
    __typename: 'ClRoom';
    id: string;
    messages: {
      __typename: 'ModelClMessageConnection';
      items: Array<{
        __typename: 'ClMessage';
        id: string;
        content: string;
        when: string;
        roomId: string | null;
        createdAt: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    createdAt: string | null;
  } | null;
};

export type OnCreateClMessageSubscription = {
  onCreateClMessage: {
    __typename: 'ClMessage';
    id: string;
    content: string;
    when: string;
    roomId: string | null;
    room: {
      __typename: 'ClRoom';
      id: string;
      messages: {
        __typename: 'ModelClMessageConnection';
        nextToken: string | null;
      } | null;
      createdAt: string | null;
    } | null;
    createdAt: string | null;
  } | null;
};

export type OnUpdateClMessageSubscription = {
  onUpdateClMessage: {
    __typename: 'ClMessage';
    id: string;
    content: string;
    when: string;
    roomId: string | null;
    room: {
      __typename: 'ClRoom';
      id: string;
      messages: {
        __typename: 'ModelClMessageConnection';
        nextToken: string | null;
      } | null;
      createdAt: string | null;
    } | null;
    createdAt: string | null;
  } | null;
};

export type OnDeleteClMessageSubscription = {
  onDeleteClMessage: {
    __typename: 'ClMessage';
    id: string;
    content: string;
    when: string;
    roomId: string | null;
    room: {
      __typename: 'ClRoom';
      id: string;
      messages: {
        __typename: 'ModelClMessageConnection';
        nextToken: string | null;
      } | null;
      createdAt: string | null;
    } | null;
    createdAt: string | null;
  } | null;
};
