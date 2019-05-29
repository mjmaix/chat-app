import React from 'react';
import { render } from 'react-native-testing-library';
import 'jest-styled-components/native';

import { StyledScrollView } from './StyledScrollView';
import { Text } from 'react-native';

const createTestProps = (props?: object) => ({
  testID: 'testid',
  ...props,
});

test('it works', () => {
  const props = createTestProps();
  const { getByTestId } = render(
    <StyledScrollView {...props}>
      <Text>TEST</Text>
    </StyledScrollView>,
  );
  expect(getByTestId('testid')).toMatchSnapshot();
});
