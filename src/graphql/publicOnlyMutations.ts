export const createClConvoLinkPublic = `mutation CreateClConvoLinkPublic($input: CreateClConvoLinkInput!) {
    createClConvoLink(input: $input) {
      id
      clConvoLinkUserId
      clConvoLinkConversationId
      createdAt
      updatedAt
    }
  }
  `;
