import React from 'react';
import { render } from 'react-native-testing-library';
import 'jest-styled-components/native';

import { StyledScreenContainer } from './StyledScreenContainer';
import { Text } from 'react-native';

const createTestProps = (props?: object) => ({
  testID: 'testid',
  ...props,
});

test('it works', () => {
  const props = createTestProps();
  const { getByTestId } = render(
    <StyledScreenContainer {...props}>
      <Text>TEST</Text>
    </StyledScreenContainer>,
  );
  expect(getByTestId('testid')).toMatchSnapshot();
});
