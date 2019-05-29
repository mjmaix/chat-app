import { containerStyles, formStyles } from '../components';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { DevBorders } from '../utils';
import { TabBarAwareScrollView } from '../components/Navigation/TabBarAwareScrollView';

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
  },
});

export const StyledView = styled.View``;

export const StyledScreenContainer = styled.SafeAreaView`
  ${props => ({
    ...containerStyles.fullCenter,
  })};
`;

export const StyledScrollView = styled(TabBarAwareScrollView).attrs(props => ({
  contentContainerStyle: () => {
    return {
      flex: 1,
    };
  },
}))`
  flex: 1;
`;

export const StyledTopContainer = styled.View`
  ${props => ({
    ...containerStyles.fixedTop,
    ...styles.searchContainer,
  })}
`;

export const StyledBottomContainer = styled.View`
  ${props => ({
    ...containerStyles.fixedBottom,
    ...styles.searchContainer,
  })}
`;

export const StyledFormContainer = styled.View`
  ${props => ({
    ...formStyles.form,
  })}
`;

export const StyledFormRow = styled.View`
  ${props => ({
    ...formStyles.formItem,
  })}
`;
