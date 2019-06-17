/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateClUserInput = {
  id?: string | null,
  givenName: string,
  familyName: string,
  email: string,
  avatar?: string | null,
  identityId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type UpdateClUserInput = {
  id: string,
  givenName?: string | null,
  familyName?: string | null,
  email?: string | null,
  avatar?: string | null,
  identityId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteClUserInput = {
  id?: string | null,
};

export type CreateClConversationInput = {
  id?: string | null,
  name: string,
  members?: Array< string > | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type CreateClMessageInput = {
  id?: string | null,
  content: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  clMessageAuthorId?: string | null,
  clMessageConversationId: string,
};

export type UpdateClMessageInput = {
  id: string,
  content?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  clMessageAuthorId?: string | null,
  clMessageConversationId?: string | null,
};

export type DeleteClMessageInput = {
  id?: string | null,
};

export type CreateClConvoLinkInput = {
  id?: string | null,
  clConvoLinkUserId?: string | null,
  clConvoLinkConversationId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type UpdateClConvoLinkInput = {
  id: string,
  clConvoLinkUserId?: string | null,
  clConvoLinkConversationId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelClUserFilterInput = {
  id?: ModelIDFilterInput | null,
  givenName?: ModelStringFilterInput | null,
  familyName?: ModelStringFilterInput | null,
  email?: ModelStringFilterInput | null,
  avatar?: ModelStringFilterInput | null,
  identityId?: ModelStringFilterInput | null,
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

export type ModelClConversationFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  members?: ModelStringFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  updatedAt?: ModelStringFilterInput | null,
  and?: Array< ModelClConversationFilterInput | null > | null,
  or?: Array< ModelClConversationFilterInput | null > | null,
  not?: ModelClConversationFilterInput | null,
};

export type CreateClUserMutationVariables = {
  input: CreateClUserInput,
};

export type CreateClUserMutation = {
  createClUser:  {
    __typename: "ClUser",
    id: string,
    convoLinks:  {
      __typename: "ModelClConvoLinkConnection",
      items:  Array< {
        __typename: "ClConvoLink",
        id: string,
        user:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkUserId: string | null,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkConversationId: string | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    messages:  {
      __typename: "ModelClMessageConnection",
      items:  Array< {
        __typename: "ClMessage",
        id: string,
        author:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null,
        content: string,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    givenName: string,
    familyName: string,
    email: string,
    avatar: string | null,
    identityId: string | null,
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
    convoLinks:  {
      __typename: "ModelClConvoLinkConnection",
      items:  Array< {
        __typename: "ClConvoLink",
        id: string,
        user:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkUserId: string | null,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkConversationId: string | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    messages:  {
      __typename: "ModelClMessageConnection",
      items:  Array< {
        __typename: "ClMessage",
        id: string,
        author:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null,
        content: string,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    givenName: string,
    familyName: string,
    email: string,
    avatar: string | null,
    identityId: string | null,
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
    convoLinks:  {
      __typename: "ModelClConvoLinkConnection",
      items:  Array< {
        __typename: "ClConvoLink",
        id: string,
        user:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkUserId: string | null,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkConversationId: string | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    messages:  {
      __typename: "ModelClMessageConnection",
      items:  Array< {
        __typename: "ClMessage",
        id: string,
        author:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null,
        content: string,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    givenName: string,
    familyName: string,
    email: string,
    avatar: string | null,
    identityId: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type CreateClConvoMutationVariables = {
  input: CreateClConversationInput,
};

export type CreateClConvoMutation = {
  createClConvo:  {
    __typename: "ClConversation",
    id: string,
    messages:  {
      __typename: "ModelClMessageConnection",
      items:  Array< {
        __typename: "ClMessage",
        id: string,
        author:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null,
        content: string,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    associated:  {
      __typename: "ModelClConvoLinkConnection",
      items:  Array< {
        __typename: "ClConvoLink",
        id: string,
        user:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkUserId: string | null,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkConversationId: string | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    name: string,
    members: Array< string > | null,
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
      convoLinks:  {
        __typename: "ModelClConvoLinkConnection",
        items:  Array< {
          __typename: "ClConvoLink",
          id: string,
          clConvoLinkUserId: string | null,
          clConvoLinkConversationId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      messages:  {
        __typename: "ModelClMessageConnection",
        items:  Array< {
          __typename: "ClMessage",
          id: string,
          content: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      givenName: string,
      familyName: string,
      email: string,
      avatar: string | null,
      identityId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    content: string,
    conversation:  {
      __typename: "ClConversation",
      id: string,
      messages:  {
        __typename: "ModelClMessageConnection",
        items:  Array< {
          __typename: "ClMessage",
          id: string,
          content: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      associated:  {
        __typename: "ModelClConvoLinkConnection",
        items:  Array< {
          __typename: "ClConvoLink",
          id: string,
          clConvoLinkUserId: string | null,
          clConvoLinkConversationId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string,
      members: Array< string > | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
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
      convoLinks:  {
        __typename: "ModelClConvoLinkConnection",
        items:  Array< {
          __typename: "ClConvoLink",
          id: string,
          clConvoLinkUserId: string | null,
          clConvoLinkConversationId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      messages:  {
        __typename: "ModelClMessageConnection",
        items:  Array< {
          __typename: "ClMessage",
          id: string,
          content: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      givenName: string,
      familyName: string,
      email: string,
      avatar: string | null,
      identityId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    content: string,
    conversation:  {
      __typename: "ClConversation",
      id: string,
      messages:  {
        __typename: "ModelClMessageConnection",
        items:  Array< {
          __typename: "ClMessage",
          id: string,
          content: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      associated:  {
        __typename: "ModelClConvoLinkConnection",
        items:  Array< {
          __typename: "ClConvoLink",
          id: string,
          clConvoLinkUserId: string | null,
          clConvoLinkConversationId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string,
      members: Array< string > | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
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
      convoLinks:  {
        __typename: "ModelClConvoLinkConnection",
        items:  Array< {
          __typename: "ClConvoLink",
          id: string,
          clConvoLinkUserId: string | null,
          clConvoLinkConversationId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      messages:  {
        __typename: "ModelClMessageConnection",
        items:  Array< {
          __typename: "ClMessage",
          id: string,
          content: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      givenName: string,
      familyName: string,
      email: string,
      avatar: string | null,
      identityId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    content: string,
    conversation:  {
      __typename: "ClConversation",
      id: string,
      messages:  {
        __typename: "ModelClMessageConnection",
        items:  Array< {
          __typename: "ClMessage",
          id: string,
          content: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      associated:  {
        __typename: "ModelClConvoLinkConnection",
        items:  Array< {
          __typename: "ClConvoLink",
          id: string,
          clConvoLinkUserId: string | null,
          clConvoLinkConversationId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string,
      members: Array< string > | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type CreateClConvoLinkMutationVariables = {
  input: CreateClConvoLinkInput,
};

export type CreateClConvoLinkMutation = {
  createClConvoLink:  {
    __typename: "ClConvoLink",
    id: string,
    user:  {
      __typename: "ClUser",
      id: string,
      convoLinks:  {
        __typename: "ModelClConvoLinkConnection",
        items:  Array< {
          __typename: "ClConvoLink",
          id: string,
          clConvoLinkUserId: string | null,
          clConvoLinkConversationId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      messages:  {
        __typename: "ModelClMessageConnection",
        items:  Array< {
          __typename: "ClMessage",
          id: string,
          content: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      givenName: string,
      familyName: string,
      email: string,
      avatar: string | null,
      identityId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    clConvoLinkUserId: string | null,
    conversation:  {
      __typename: "ClConversation",
      id: string,
      messages:  {
        __typename: "ModelClMessageConnection",
        items:  Array< {
          __typename: "ClMessage",
          id: string,
          content: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      associated:  {
        __typename: "ModelClConvoLinkConnection",
        items:  Array< {
          __typename: "ClConvoLink",
          id: string,
          clConvoLinkUserId: string | null,
          clConvoLinkConversationId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string,
      members: Array< string > | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    clConvoLinkConversationId: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type UpdateClConvoLinkMutationVariables = {
  input: UpdateClConvoLinkInput,
};

export type UpdateClConvoLinkMutation = {
  updateClConvoLink:  {
    __typename: "ClConvoLink",
    id: string,
    user:  {
      __typename: "ClUser",
      id: string,
      convoLinks:  {
        __typename: "ModelClConvoLinkConnection",
        items:  Array< {
          __typename: "ClConvoLink",
          id: string,
          clConvoLinkUserId: string | null,
          clConvoLinkConversationId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      messages:  {
        __typename: "ModelClMessageConnection",
        items:  Array< {
          __typename: "ClMessage",
          id: string,
          content: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      givenName: string,
      familyName: string,
      email: string,
      avatar: string | null,
      identityId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    clConvoLinkUserId: string | null,
    conversation:  {
      __typename: "ClConversation",
      id: string,
      messages:  {
        __typename: "ModelClMessageConnection",
        items:  Array< {
          __typename: "ClMessage",
          id: string,
          content: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      associated:  {
        __typename: "ModelClConvoLinkConnection",
        items:  Array< {
          __typename: "ClConvoLink",
          id: string,
          clConvoLinkUserId: string | null,
          clConvoLinkConversationId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string,
      members: Array< string > | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    clConvoLinkConversationId: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type GetClUserWithConvosQueryVariables = {
  id: string,
};

export type GetClUserWithConvosQuery = {
  getClUser:  {
    __typename: "ClUser",
    id: string,
    convoLinks:  {
      __typename: "ModelClConvoLinkConnection",
      items:  Array< {
        __typename: "ClConvoLink",
        id: string,
        clConvoLinkUserId: string | null,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
          messages:  {
            __typename: "ModelClMessageConnection",
            items:  Array< {
              __typename: "ClMessage",
              id: string,
              author:  {
                __typename: "ClUser",
                id: string,
                givenName: string,
                familyName: string,
                email: string,
                avatar: string | null,
                identityId: string | null,
                createdAt: string | null,
                updatedAt: string | null,
              } | null,
              content: string,
              conversation:  {
                __typename: "ClConversation",
                id: string,
                name: string,
                members: Array< string > | null,
                createdAt: string | null,
                updatedAt: string | null,
              },
              createdAt: string | null,
              updatedAt: string | null,
            } | null > | null,
            nextToken: string | null,
          } | null,
        },
        clConvoLinkConversationId: string | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    givenName: string,
    familyName: string,
    email: string,
    avatar: string | null,
    identityId: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type CreateClConvoLinkPublicMutationVariables = {
  input: CreateClConvoLinkInput,
};

export type CreateClConvoLinkPublicMutation = {
  createClConvoLink:  {
    __typename: "ClConvoLink",
    id: string,
    clConvoLinkUserId: string | null,
    clConvoLinkConversationId: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type ListContactsQueryVariables = {
  filter?: ModelClUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListContactsQuery = {
  listClUsers:  {
    __typename: "ModelClUserConnection",
    items:  Array< {
      __typename: "ClUser",
      id: string,
      givenName: string,
      familyName: string,
      email: string,
      avatar: string | null,
      identityId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetClUserQueryVariables = {
  id: string,
};

export type GetClUserQuery = {
  getClUser:  {
    __typename: "ClUser",
    id: string,
    convoLinks:  {
      __typename: "ModelClConvoLinkConnection",
      items:  Array< {
        __typename: "ClConvoLink",
        id: string,
        user:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkUserId: string | null,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkConversationId: string | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    messages:  {
      __typename: "ModelClMessageConnection",
      items:  Array< {
        __typename: "ClMessage",
        id: string,
        author:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null,
        content: string,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    givenName: string,
    familyName: string,
    email: string,
    avatar: string | null,
    identityId: string | null,
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
      convoLinks:  {
        __typename: "ModelClConvoLinkConnection",
        items:  Array< {
          __typename: "ClConvoLink",
          id: string,
          clConvoLinkUserId: string | null,
          clConvoLinkConversationId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      messages:  {
        __typename: "ModelClMessageConnection",
        items:  Array< {
          __typename: "ClMessage",
          id: string,
          content: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      givenName: string,
      familyName: string,
      email: string,
      avatar: string | null,
      identityId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetClConversationQueryVariables = {
  id: string,
};

export type GetClConversationQuery = {
  getClConversation:  {
    __typename: "ClConversation",
    id: string,
    messages:  {
      __typename: "ModelClMessageConnection",
      items:  Array< {
        __typename: "ClMessage",
        id: string,
        author:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null,
        content: string,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    associated:  {
      __typename: "ModelClConvoLinkConnection",
      items:  Array< {
        __typename: "ClConvoLink",
        id: string,
        user:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkUserId: string | null,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkConversationId: string | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    name: string,
    members: Array< string > | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type ListClConversationsQueryVariables = {
  filter?: ModelClConversationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListClConversationsQuery = {
  listClConversations:  {
    __typename: "ModelClConversationConnection",
    items:  Array< {
      __typename: "ClConversation",
      id: string,
      messages:  {
        __typename: "ModelClMessageConnection",
        items:  Array< {
          __typename: "ClMessage",
          id: string,
          content: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      associated:  {
        __typename: "ModelClConvoLinkConnection",
        items:  Array< {
          __typename: "ClConvoLink",
          id: string,
          clConvoLinkUserId: string | null,
          clConvoLinkConversationId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string,
      members: Array< string > | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateClMessageSubscriptionVariables = {
  members: Array< string >,
};

export type OnCreateClMessageSubscription = {
  onCreateClMessage:  {
    __typename: "ClMessage",
    id: string,
    author:  {
      __typename: "ClUser",
      id: string,
      convoLinks:  {
        __typename: "ModelClConvoLinkConnection",
        items:  Array< {
          __typename: "ClConvoLink",
          id: string,
          clConvoLinkUserId: string | null,
          clConvoLinkConversationId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      messages:  {
        __typename: "ModelClMessageConnection",
        items:  Array< {
          __typename: "ClMessage",
          id: string,
          content: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      givenName: string,
      familyName: string,
      email: string,
      avatar: string | null,
      identityId: string | null,
      createdAt: string | null,
      updatedAt: string | null,
    } | null,
    content: string,
    conversation:  {
      __typename: "ClConversation",
      id: string,
      messages:  {
        __typename: "ModelClMessageConnection",
        items:  Array< {
          __typename: "ClMessage",
          id: string,
          content: string,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      associated:  {
        __typename: "ModelClConvoLinkConnection",
        items:  Array< {
          __typename: "ClConvoLink",
          id: string,
          clConvoLinkUserId: string | null,
          clConvoLinkConversationId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null > | null,
        nextToken: string | null,
      } | null,
      name: string,
      members: Array< string > | null,
      createdAt: string | null,
      updatedAt: string | null,
    },
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnCreateClConversationSubscriptionVariables = {
  members: string,
};

export type OnCreateClConversationSubscription = {
  onCreateClConversation:  {
    __typename: "ClConversation",
    id: string,
    messages:  {
      __typename: "ModelClMessageConnection",
      items:  Array< {
        __typename: "ClMessage",
        id: string,
        author:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null,
        content: string,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    associated:  {
      __typename: "ModelClConvoLinkConnection",
      items:  Array< {
        __typename: "ClConvoLink",
        id: string,
        user:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkUserId: string | null,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkConversationId: string | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    name: string,
    members: Array< string > | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnCreateClUserSubscription = {
  onCreateClUser:  {
    __typename: "ClUser",
    id: string,
    convoLinks:  {
      __typename: "ModelClConvoLinkConnection",
      items:  Array< {
        __typename: "ClConvoLink",
        id: string,
        user:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkUserId: string | null,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkConversationId: string | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    messages:  {
      __typename: "ModelClMessageConnection",
      items:  Array< {
        __typename: "ClMessage",
        id: string,
        author:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null,
        content: string,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    givenName: string,
    familyName: string,
    email: string,
    avatar: string | null,
    identityId: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnUpdateClUserSubscription = {
  onUpdateClUser:  {
    __typename: "ClUser",
    id: string,
    convoLinks:  {
      __typename: "ModelClConvoLinkConnection",
      items:  Array< {
        __typename: "ClConvoLink",
        id: string,
        user:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkUserId: string | null,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkConversationId: string | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    messages:  {
      __typename: "ModelClMessageConnection",
      items:  Array< {
        __typename: "ClMessage",
        id: string,
        author:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null,
        content: string,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    givenName: string,
    familyName: string,
    email: string,
    avatar: string | null,
    identityId: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};

export type OnDeleteClUserSubscription = {
  onDeleteClUser:  {
    __typename: "ClUser",
    id: string,
    convoLinks:  {
      __typename: "ModelClConvoLinkConnection",
      items:  Array< {
        __typename: "ClConvoLink",
        id: string,
        user:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkUserId: string | null,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        clConvoLinkConversationId: string | null,
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    messages:  {
      __typename: "ModelClMessageConnection",
      items:  Array< {
        __typename: "ClMessage",
        id: string,
        author:  {
          __typename: "ClUser",
          id: string,
          givenName: string,
          familyName: string,
          email: string,
          avatar: string | null,
          identityId: string | null,
          createdAt: string | null,
          updatedAt: string | null,
        } | null,
        content: string,
        conversation:  {
          __typename: "ClConversation",
          id: string,
          name: string,
          members: Array< string > | null,
          createdAt: string | null,
          updatedAt: string | null,
        },
        createdAt: string | null,
        updatedAt: string | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
    givenName: string,
    familyName: string,
    email: string,
    avatar: string | null,
    identityId: string | null,
    createdAt: string | null,
    updatedAt: string | null,
  } | null,
};
