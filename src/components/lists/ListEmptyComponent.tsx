import React from 'react';

import { StyledBoldText } from '../../styled/StyledErrorComponents';
import { StyledCenterContainer } from '../../styled/StyledScreenContainer';

function ListEmptyComponent(props: { message: string }) {
  return (
    <StyledCenterContainer>
      <StyledBoldText>{props.message}</StyledBoldText>
    </StyledCenterContainer>
  );
}

export { ListEmptyComponent };
