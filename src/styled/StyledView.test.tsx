import React from 'react';
import { render } from 'react-native-testing-library';
import 'jest-styled-components/native';

import { StyledView } from './StyledView';
import { Text } from 'react-native';

const createTestProps = (props?: object) => ({
  testID: 'testid',
  ...props,
});

test('it works', () => {
  const props = createTestProps();
  const { getByTestId } = render(
    <StyledView {...props}>
      <Text>TEST</Text>
    </StyledView>,
  );
  expect(getByTestId('testid')).toMatchSnapshot();
});
