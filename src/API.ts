/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateClUserInput = {
  id?: string | null,
  username: string,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type UpdateClUserInput = {
  id: string,
  username?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteClUserInput = {
  id?: string | null,
};

export type CreateClConversationInput = {
  id?: string | null,
  name: string,
  members: Array< string >,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type CreateClMessageInput = {
  id?: string | null,
  authorId?: string | null,
  content: string,
  messageConversationId: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  clMessageConversationId: string,
};

export type UpdateClMessageInput = {
  id: string,
  authorId?: string | null,
  content?: string | null,
  messageConversationId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  clMessageConversationId?: string | null,
};

export type DeleteClMessageInput = {
  id?: string | null,
};

export type CreateClConvoLinkInput = {
  id?: string | null,
  convoLinkUserId?: string | null,
  convoLinkConversationId: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  clConvoLinkUserId: string,
  clConvoLinkConversationId: string,
};

export type UpdateClConvoLinkInput = {
  id: string,
  convoLinkUserId?: string | null,
  convoLinkConversationId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  clConvoLinkUserId?: string | null,
  clConvoLinkConversationId?: string | null,
};

export type ModelClUserFilterInput = {
  id?: ModelIDFilterInput | null,
  username?: ModelStringFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  updatedAt?: ModelStringFilterInput | null,
  and?: Array< ModelClUserFilterInput | null > | null,
  or?: Array< ModelClUserFilterInput | null > | null,
  not?: ModelClUserFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type CreateClUserMutationVariables = {
  input: CreateClUserInput,
};

export type CreateClUserMutation = {
  createClUser:  {
    __typename: "ClUser",
    id: string,
    username: string,
    conversations:  {
      __typename: "ModelClConvoLinkConnection",
      nextToken: string | null,
    } | null,
    messages:  {
      __typename: "ModelClMessageConnection",
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type UpdateClUserMutationVariables = {
  input: UpdateClUserInput,
};

export type UpdateClUserMutation = {
  updateClUser:  {
    __typename: "ClUser",
    id: string,
    username: string,
    conversations:  {
      __typename: "ModelClConvoLinkConnection",
      nextToken: string | null,
    } | null,
    messages:  {
      __typename: "ModelClMessageConnection",
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type DeleteClUserMutationVariables = {
  input: DeleteClUserInput,
};

export type DeleteClUserMutation = {
  deleteClUser:  {
    __typename: "ClUser",
    id: string,
    username: string,
    conversations:  {
      __typename: "ModelClConvoLinkConnection",
      nextToken: string | null,
    } | null,
    messages:  {
      __typename: "ModelClMessageConnection",
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type CreateConvoMutationVariables = {
  input: CreateClConversationInput,
};

export type CreateConvoMutation = {
  createConvo:  {
    __typename: "ClConversation",
    id: string,
    messages:  {
      __typename: "ModelClMessageConnection",
      nextToken: string | null,
    } | null,
    associated:  {
      __typename: "ModelClConvoLinkConnection",
      nextToken: string | null,
    } | null,
    name: string,
    members: Array< string >,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type CreateClMessageMutationVariables = {
  input: CreateClMessageInput,
};

export type CreateClMessageMutation = {
  createClMessage:  {
    __typename: "ClMessage",
    id: string,
    author:  {
      __typename: "ClUser",
      id: string,
      username: string,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    authorId: string | null,
    content: string,
    conversation:  {
      __typename: "ClConversation",
      id: string,
      name: string,
      members: Array< string >,
      createdAt: string | null,
      updatedAt: string | null,
    },
    messageConversationId: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type UpdateClMessageMutationVariables = {
  input: UpdateClMessageInput,
};

export type UpdateClMessageMutation = {
  updateClMessage:  {
    __typename: "ClMessage",
    id: string,
    author:  {
      __typename: "ClUser",
      id: string,
      username: string,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    authorId: string | null,
    content: string,
    conversation:  {
      __typename: "ClConversation",
      id: string,
      name: string,
      members: Array< string >,
      createdAt: string | null,
      updatedAt: string | null,
    },
    messageConversationId: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type DeleteClMessageMutationVariables = {
  input: DeleteClMessageInput,
};

export type DeleteClMessageMutation = {
  deleteClMessage:  {
    __typename: "ClMessage",
    id: string,
    author:  {
      __typename: "ClUser",
      id: string,
      username: string,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    authorId: string | null,
    content: string,
    conversation:  {
      __typename: "ClConversation",
      id: string,
      name: string,
      members: Array< string >,
      createdAt: string | null,
      updatedAt: string | null,
    },
    messageConversationId: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type CreateConvoLinkMutationVariables = {
  input: CreateClConvoLinkInput,
};

export type CreateConvoLinkMutation = {
  createConvoLink:  {
    __typename: "ClConvoLink",
    id: string,
    user:  {
      __typename: "ClUser",
      id: string,
      username: string,
      createdAt: string | null,
      updatedAt: string | null,
    },
    convoLinkUserId: string | null,
    conversation:  {
      __typename: "ClConversation",
      id: string,
      name: string,
      members: Array< string >,
      createdAt: string | null,
      updatedAt: string | null,
    },
    convoLinkConversationId: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type UpdateConvoLinkMutationVariables = {
  input: UpdateClConvoLinkInput,
};

export type UpdateConvoLinkMutation = {
  updateConvoLink:  {
    __typename: "ClConvoLink",
    id: string,
    user:  {
      __typename: "ClUser",
      id: string,
      username: string,
      createdAt: string | null,
      updatedAt: string | null,
    },
    convoLinkUserId: string | null,
    conversation:  {
      __typename: "ClConversation",
      id: string,
      name: string,
      members: Array< string >,
      createdAt: string | null,
      updatedAt: string | null,
    },
    convoLinkConversationId: string,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type GetClUserQueryVariables = {
  id: string,
};

export type GetClUserQuery = {
  getClUser:  {
    __typename: "ClUser",
    id: string,
    username: string,
    conversations:  {
      __typename: "ModelClConvoLinkConnection",
      nextToken: string | null,
    } | null,
    messages:  {
      __typename: "ModelClMessageConnection",
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type ListClUsersQueryVariables = {
  filter?: ModelClUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListClUsersQuery = {
  listClUsers:  {
    __typename: "ModelClUserConnection",
    items:  Array< {
      __typename: "ClUser",
      id: string,
      username: string,
      createdAt: string | null,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetConvoQueryVariables = {
  id: string,
};

export type GetConvoQuery = {
  getConvo:  {
    __typename: "ClConversation",
    id: string,
    messages:  {
      __typename: "ModelClMessageConnection",
      nextToken: string | null,
    } | null,
    associated:  {
      __typename: "ModelClConvoLinkConnection",
      nextToken: string | null,
    } | null,
    name: string,
    members: Array< string >,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnCreateClUserSubscription = {
  onCreateClUser:  {
    __typename: "ClUser",
    id: string,
    username: string,
    conversations:  {
      __typename: "ModelClConvoLinkConnection",
      nextToken: string | null,
    } | null,
    messages:  {
      __typename: "ModelClMessageConnection",
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnUpdateClUserSubscription = {
  onUpdateClUser:  {
    __typename: "ClUser",
    id: string,
    username: string,
    conversations:  {
      __typename: "ModelClConvoLinkConnection",
      nextToken: string | null,
    } | null,
    messages:  {
      __typename: "ModelClMessageConnection",
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnDeleteClUserSubscription = {
  onDeleteClUser:  {
    __typename: "ClUser",
    id: string,
    username: string,
    conversations:  {
      __typename: "ModelClConvoLinkConnection",
      nextToken: string | null,
    } | null,
    messages:  {
      __typename: "ModelClMessageConnection",
      nextToken: string | null,
    } | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};
